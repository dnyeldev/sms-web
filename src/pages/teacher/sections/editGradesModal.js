import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import _ from 'lodash'
import { useMutation, useQuery } from '@apollo/client'
import { GET_QUARTERLY_GRADE, getUserQuery, saveGrades } from './gql'
import { LoadingSpinner } from '../../../components'
import SectionContext from './sections.context'

const validateGrade = (value) => {
  if (!value) return true

  var reg = /^\d+$/
  const valid = reg.test(value)
  const length = value.length

  if (length > 3) {
    return 'Please input not morethan three numbers'
  }

  if (!valid) {
    return 'Invalid numbers'
  }

  return true
}

export default function Index({ children, enrolleeId, quarterlyId }) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { schoolYearId, sectionSubjectId } = useContext(SectionContext)

  const formInstant = useForm()
  const {
    handleSubmit,
    formState,
    control,
    setValue,
    watch,
    reset
  } = formInstant
  const { errors } = formState

  const { data: quarterResult, loading: loadingQuarter } = useQuery(
    GET_QUARTERLY_GRADE,
    {
      skip: !quarterlyId,
      variables: { id: quarterlyId }
    }
  )

  useEffect(() => {
    let result = _.has(quarterResult, 'getQuarterlyGrade')
      ? quarterResult.getQuarterlyGrade
      : null
    const q1 = _.has(result, 'q1') ? result.q1 : null
    const q2 = _.has(result, 'q2') ? result.q2 : null
    const q3 = _.has(result, 'q3') ? result.q3 : null
    const q4 = _.has(result, 'q4') ? result.q4 : null
    const verdict = _.has(result, 'verdict') ? result.verdict : null

    setValue('q1', q1)
    setValue('q2', q2)
    setValue('q3', q3)
    setValue('q4', q4)
    setValue('verdict', verdict)
  }, [quarterResult])

  const watchVerdict = watch('verdict')

  useEffect(() => {
    if (watchVerdict === 'Select Verdict' || watchVerdict === 'invalid') {
      setValue('verdict', undefined)
    }
  }, [watchVerdict])

  const [doSaveGrade, { loading: loadingSave }] = useMutation(saveGrades, {
    awaitRefetchQueries: true,
    refetchQueries: ['GET_SECTION_STUDENTS'],
    onCompleted() {
      setVisible(false)
      reset()
    }
  })

  useEffect(() => {
    setLoading(loadingSave || loadingQuarter)
  }, [loadingSave, loadingQuarter])

  const changeStatus = useCallback(
    (props) => {
      async function doSubmit() {
        const q1 = _.has(props, 'q1') ? props.q1 : null
        const q2 = _.has(props, 'q2') ? props.q2 : null
        const q3 = _.has(props, 'q3') ? props.q3 : null
        const q4 = _.has(props, 'q4') ? props.q4 : null
        const verdict = _.has(props, 'verdict') ? props.verdict : null
        const variables = {
          enrolleeId,
          sectionSubjectId,
          schoolYearId,
          q1: parseFloat(q1) || null,
          q2: parseFloat(q2) || null,
          q3: parseFloat(q3) || null,
          q4: parseFloat(q4) || null,
          verdict
        }

        await doSaveGrade({ variables })
      }

      doSubmit()
    },
    [enrolleeId, sectionSubjectId, doSaveGrade]
  )

  const submitForm = useCallback((data) => {
    handleSubmit(changeStatus)()
  })

  const handleShow = useCallback(() => {
    setVisible(true)
  }, [children])

  return (
    <>
      <Button variant='link' onClick={handleShow} disabled={!sectionSubjectId}>
        {children}
      </Button>

      <Modal show={visible} onHide={() => setVisible(false)} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student Subject Grades</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate>
            <Row gutter={[16, 16]} className='mb-3'>
              <Col lg={3}>
                <Form.Group as={Row} controlId='grade.q1'>
                  <Form.Label column sm='1'>
                    Q1
                  </Form.Label>
                  <Col>
                    <Controller
                      name='q1'
                      control={control}
                      rules={{
                        required: 'Field is required.',
                        validate: validateGrade
                      }}
                      render={({ field }) => (
                        <Form.Control
                          isInvalid={!!_.has(errors, 'q1')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'q1')
                        ? errors.q1.message
                        : 'Invalid number.'}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group as={Row} controlId='grade.q2'>
                  <Form.Label column sm='1'>
                    Q2
                  </Form.Label>
                  <Col>
                    <Controller
                      name='q2'
                      control={control}
                      rules={{
                        validate: validateGrade
                      }}
                      render={({ field }) => (
                        <Form.Control
                          isInvalid={!!_.has(errors, 'q2')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'q2')
                        ? errors.q2.message
                        : 'Invalid number.'}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group as={Row} controlId='grade.q3'>
                  <Form.Label column sm='1'>
                    Q3
                  </Form.Label>
                  <Col>
                    <Controller
                      name='q3'
                      control={control}
                      rules={{
                        validate: validateGrade
                      }}
                      render={({ field }) => (
                        <Form.Control
                          isInvalid={!!_.has(errors, 'q3')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'q3')
                        ? errors.q1.message
                        : 'Invalid number.'}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group as={Row} controlId='grade.q4'>
                  <Form.Label column sm='1'>
                    Q4
                  </Form.Label>
                  <Col>
                    <Controller
                      name='q4'
                      control={control}
                      rules={{
                        validate: validateGrade
                      }}
                      render={({ field }) => (
                        <Form.Control
                          isInvalid={!!_.has(errors, 'q4')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'q4')
                        ? errors.q4.message
                        : 'Invalid number.'}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Form.Group controlId='grade.verdict'>
                  <Form.Label>Verdict</Form.Label>
                  <Controller
                    name='verdict'
                    control={control}
                    render={({ field }) => (
                      <Form.Select
                        isInvalid={!!_.has(errors, 'verdict')}
                        {...field}
                      >
                        <option>Select Verdict</option>
                        <option>FAILED</option>
                        <option>PASSED</option>
                        <option>INCOMPLETE</option>
                      </Form.Select>
                    )}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {_.has(errors, 'verdict')
                      ? errors.verdict.message
                      : 'Invalid string.'}
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
