import React, { useCallback, useEffect, useState } from 'react'
import 'react-select-search/style.css'
import _ from 'lodash'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { LoadingSpinner } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { SAVE_STUDENT_LRN } from './gql'

export default function Index(payload) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { userId } = payload
  const formInstant = useForm()
  const { handleSubmit, formState, control, reset } = formInstant
  const { errors } = formState

  const handleShow = () => {
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
    reset()
  }

  const [saveLrn, { loading: loadingLrnSave }] = useMutation(SAVE_STUDENT_LRN, {
    onCompleted: () => {
      handleClose()
    }
  })

  useEffect(() => {
    setLoading(loadingLrnSave)
  }, [loadingLrnSave])

  const doSave = useCallback((props) => {
    const { lrnNo } = props

    saveLrn({
      variables: { lrnNo, userId }
    })
  })

  const onSubmit = useCallback((data) => {
    handleSubmit(doSave)()
  })

  return (
    <>
      <Button variant='link' onClick={handleShow} disabled={loading}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FontAwesomeIcon icon={solid('edit')} /> LRN
          </>
        )}
      </Button>

      <Modal size='md' show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Edit LRN No.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Row className='mb-3'>
              <Form.Group as={Col} sm={12} controlId='profile.lrnNo'>
                <Form.Label>LRN No.</Form.Label>
                <Controller
                  name='lrnNo'
                  control={control}
                  rules={{ required: 'Field is required.' }}
                  render={({ field }) => (
                    <Form.Control
                      isInvalid={!!_.has(errors, 'lrnNo')}
                      {...field}
                    />
                  )}
                />
                <Form.Control.Feedback type='invalid'>
                  {_.has(errors, 'lrnNo')
                    ? errors.lrnNo.message
                    : 'Invalid LRN.'}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleClose()} variant='primary'>
            Close
          </Button>
          <Button variant='secondary' onClick={onSubmit} disabled={loading}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <FontAwesomeIcon icon={solid('check')} /> Save
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
