import React, { useCallback, useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { AlertError, LoadingSpinner } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useForm } from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'
import { ADD_SUBJECT_TEACHER } from './gql'
import { useMutation } from '@apollo/client'
import { LoginContext } from '../login'
import SelectTeachers from '../../components/SelectTeachers'
import SelectSubject from '../../components/SelectSubject'
import SubjectContext from './subjects.context'

export default function Index() {
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(null)
  const formInstant = useForm()
  const { userId } = useContext(LoginContext)
  const { subjectId } = useContext(SubjectContext)

  const { handleSubmit, formState, reset, setValue } = formInstant
  const { errors } = formState

  const handleShow = () => {
    setVisible(true)
  }

  const handleClose = () => {
    reset()
    setVisible(false)
  }

  const [create, { loading }] = useMutation(ADD_SUBJECT_TEACHER, {
    awaitRefetchQueries: true,
    refetchQueries: ['GET_SUBJECT_TEACHERS'],
    onCompleted: () => {
      handleClose()
    },
    onError: (err) => {
      const message = _.has(err, 'message') ? err.message : err.toString()
      setError(message)
    }
  })

  const onSubmit = useCallback(
    (data) => {
      const subjectId = _.has(data, 'subjectId')
        ? parseInt(data.subjectId)
        : null
      const userId = _.has(data, 'teacherId') ? parseInt(data.teacherId) : null

      create({
        variables: { subjectId, userId }
      })
    },
    [create, userId]
  )

  useEffect(() => {
    setValue('subjectId', subjectId)
  }, [subjectId])

  return (
    <>
      <Button disabled={loading} onClick={handleShow}>
        <FontAwesomeIcon icon={solid('people-roof')} />{' '}
        {loading ? 'Loading…' : 'Add Subject Teacher'}
      </Button>

      <Modal show={visible} onHide={handleClose} centered>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Subject Teacher</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className='mb-3'>
              <SelectSubject disabled {...formInstant} />
            </Row>
            <Row className='mb-3'>
              <SelectTeachers {...formInstant} />
            </Row>
            <Row>
              <Col>
                {error && (
                  <Col lg={12}>
                    <AlertError
                      error={error}
                      title={'Create Error'}
                      onClose={() => setError(null)}
                    />
                  </Col>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleClose()} variant='link'>
              Close
            </Button>
            <Button variant='primary' disabled={loading} type='submit'>
              {loading ? <LoadingSpinner /> : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

const CustomInput = React.forwardRef((props, inRef) => (
  <Form.Control ref={inRef} {...props} />
))

const DatePicker = React.forwardRef(({ value, isInvalid, ...etc }, ref) => (
  <ReactDatePicker
    dateFormat='yyyy-MM-dd'
    customInput={<CustomInput isInvalid={isInvalid} />}
    selected={value}
    minDate={new Date()}
    {...etc}
  />
))
