import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import _ from 'lodash'
import { useMutation, useQuery } from '@apollo/client'
import { SAVE_ANNOUNCEMENT, GET_ANNOUNCEMENT } from './gql'
import { LoadingSpinner } from '../../../components'
import BroadcastContext from './broadcast.context'

export default function Index({ children, id }) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const formInstant = useForm({
    defaultValues: {
      audience: ['STUDENT', 'TEACHER', 'REGISTRAR']
    }
  })
  const { handleSubmit, formState, control, setValue, reset } = formInstant
  const { errors } = formState

  const { data, loadingAnnouncement } = useQuery(GET_ANNOUNCEMENT, {
    skip: !id,
    variables: { id }
  })

  useEffect(() => {
    let announcement = _.has(data, 'getAnnouncement')
      ? data.getAnnouncement
      : null

    let iAudience = _.has(announcement, 'audience') ? announcement.audience : []
    let iMessage = _.has(announcement, 'message') ? announcement.message : []

    if (iAudience && iAudience.length) setValue('audience', iAudience)

    setValue('message', iMessage)
  }, [data])

  const [doSave, { loading: loadingSave }] = useMutation(SAVE_ANNOUNCEMENT, {
    awaitRefetchQueries: true,
    refetchQueries: ['GET_ANNOUNCEMENTS'],
    onCompleted() {
      handleClose()
    }
  })

  useEffect(() => {
    setLoading(loadingSave || loadingAnnouncement)
  }, [loadingSave, loadingAnnouncement])

  const save = useCallback((props) => {
    async function doSubmit() {
      const variables = { ...props, id: id || undefined }

      await doSave({ variables })
    }

    doSubmit()
  }, [])

  const submitForm = useCallback((data) => {
    handleSubmit(save)()
  })

  const handleShow = useCallback(() => {
    setVisible(true)
  }, [children])

  const handleClose = useCallback(() => {
    setVisible(false)
    reset()
  }, [children])

  return (
    <>
      <Button variant='link' onClick={handleShow}>
        {children}
      </Button>

      <Modal show={visible} onHide={handleClose} centered size='md'>
        <Modal.Header closeButton>
          <Modal.Title>Announcement Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate>
            {/* <Row>
              <Col lg={12}>
                <Form.Group controlId='announcement.audience'>
                  <Form.Label>Audience</Form.Label>
                  <Controller
                    name='audience'
                    control={control}
                    render={({ field: { onBlur, value, name, ref } }) => {
                      const checkStudent = _.find(value, (i) => i === 'STUDENT')
                        ? true
                        : false
                      const checkTeacher = _.find(value, (i) => i === 'TEACHER')
                        ? true
                        : false
                      const checkRegistrar = _.find(
                        value,
                        (i) => i === 'REGISTRAR'
                      )
                        ? true
                        : false

                      return (
                        <div className='mb-3'>
                          <Form.Check
                            inline
                            type='checkbox'
                            label={`STUDENT`}
                            id={`check-student`}
                            onBlur={onBlur} // notify when input is touched
                            onChange={(e) => {
                              const val = e.target.value
                              const checked = e.target.checked
                              const curval =
                                (value && value.length && [...value]) || []

                              let newval = []
                              if (checked) newval = [...curval, val]
                              else {
                                _.remove(curval, (i) =>
                                  i === val ? true : false
                                )

                                newval = curval
                              }
                              setValue('audience', newval)
                            }}
                            checked={checkStudent}
                            _ref={ref}
                            value={'STUDENT'}
                            name={name}
                          />
                          <Form.Check
                            inline
                            type='checkbox'
                            id={`check-teacher`}
                            label={`TEACHER`}
                            value={'TEACHER'}
                            onChange={(e) => {
                              const val = e.target.value
                              const checked = e.target.checked
                              const curval =
                                (value && value.length && [...value]) || []

                              let newval = []
                              if (checked) newval = [...curval, val]
                              else {
                                _.remove(curval, (i) =>
                                  i === val ? true : false
                                )

                                newval = curval
                              }
                              setValue('audience', newval)
                            }}
                            checked={checkTeacher}
                            _ref={ref}
                            name={name}
                          />
                          <Form.Check
                            inline
                            type='checkbox'
                            id={`check-registrar`}
                            label={`REGISTRAR`}
                            value={'REGISTRAR'}
                            onChange={(e) => {
                              const val = e.target.value
                              const checked = e.target.checked
                              const curval =
                                (value && value.length && [...value]) || []

                              let newval = []
                              if (checked) newval = [...curval, val]
                              else {
                                _.remove(curval, (i) =>
                                  i === val ? true : false
                                )

                                newval = curval
                              }
                              setValue('audience', newval)
                            }}
                            checked={checkRegistrar}
                            _ref={ref}
                            name={name}
                          />
                        </div>
                      )
                    }}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {_.has(errors, 'audience')
                      ? errors.audience.message
                      : 'Invalid string.'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row> */}

            <Row gutter={[16, 16]} className='mb-3'>
              <Col lg={12}>
                <Form.Group controlId='announcement.message'>
                  <Form.Label column sm='1'>
                    Message
                  </Form.Label>
                  <Controller
                    name='message'
                    control={control}
                    rules={{
                      required: 'Field is required.'
                    }}
                    render={({ field }) => (
                      <Form.Control
                        isInvalid={!!_.has(errors, 'message')}
                        as='textarea'
                        rows={5}
                        {...field}
                      />
                    )}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {_.has(errors, 'message')
                      ? errors.message.message
                      : 'Invalid number.'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='link'
            onClick={() => setVisible(false)}
            disabled={loading}
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => submitForm()}
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
