import React, { useCallback, useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { AlertError, LoadingSpinner } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useForm } from 'react-hook-form'
import { ADD_SECTION_SUBJECT } from './gql'
import { useMutation } from '@apollo/client'
import { LoginContext } from '../../login'
import SelectSubjectTeacher from '../../../components/SelectSubjectTeacher'
import SelectSubject from '../../../components/SelectSubject'
import SectionContext from './sections.context'

export default function Index(payload) {
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(null)
  const [subjectId, setSubjectId] = useState(null)
  const formInstant = useForm()
  const { sectionId, schoolYearId, gradeLevel } = useContext(SectionContext)
  const { handleSubmit, formState, control, reset, watch } = formInstant
  const { errors } = formState

  const handleShow = () => {
    setVisible(true)
  }

  const handleClose = () => {
    reset()
    setVisible(false)
  }

  const [create, { loading }] = useMutation(ADD_SECTION_SUBJECT, {
    onCompleted: async (result) => {
      handleClose()
    },
    onError: (err) => {
      const message = _.has(err, 'message') ? err.message : err.toString()
      setError(message)
    }
  })

  const watchSubjectId = watch('subjectId')

  useEffect(() => {
    const iSubjectId = watchSubjectId ? parseInt(watchSubjectId) : null
    setSubjectId(iSubjectId)
  }, [watchSubjectId])

  const onSubmit = useCallback(
    (data) => {
      const subjectId = _.has(data, 'subjectId')
        ? parseInt(data.subjectId)
        : null
      const teacherId = _.has(data, 'teacherId')
        ? parseInt(data.teacherId)
        : null

      const variables = {
        subjectId,
        teacherId,
        sectionId: parseInt(sectionId),
        schoolYearId: parseInt(schoolYearId)
      }

      create({ variables })
    },
    [create, sectionId, schoolYearId]
  )

  return (
    <>
      <Button size='sm' variant='link' disabled={loading} onClick={handleShow}>
        <FontAwesomeIcon icon={solid('book-reader')} />{' '}
        {loading ? 'Loading…' : 'Add Section Subject'}
      </Button>

      <Modal show={visible} onHide={handleClose} centered>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Section Subject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={12}>
                <Row className='mb-3'>
                  <SelectSubject {...formInstant} gradeLevel={gradeLevel} />
                </Row>
              </Col>
            </Row>
            {subjectId && (
              <Row>
                <Col lg={12}>
                  <Row className='mb-3'>
                    <SelectSubjectTeacher
                      {...formInstant}
                      subjectId={subjectId}
                    />
                  </Row>
                </Col>
              </Row>
            )}
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
