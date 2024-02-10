import React, { useCallback, useEffect, useState } from 'react'
import 'react-select-search/style.css'
import _ from 'lodash'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { LoadingSpinner } from '../../../components'
import styledComponents from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Controller, useForm } from 'react-hook-form'
import { useLazyQuery, useMutation } from '@apollo/client'
import { ENROLL_STUDENT_MUTATION, GET_UNENROLLED_QUERY } from './gql'
import SelectSearch from 'react-select-search'
import SelectEnrollmentSY from '../../../components/SelectEnrollmentSY'
import UploadFiles from '../../../components/UploadFiles'
import SelectGradeLevels from '../../../components/SelectGradeLevels'

const StyledRow = styledComponents(Row)`
  margin-bottom: 1rem;

  .select-search-container {
    width: auto;
    color: #000;
    background-color: #fff;

    .select-search-value {
      .select-search-input {
        display: block;
        width: 100%;
        padding: 0.375rem 2.25rem 0.375rem 0.75rem;
        -moz-padding-start: calc(0.75rem - 3px);
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background-color: #fff;
        background-image: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e);
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        background-size: 16px 12px;
        border: 1px solid #ced4da;
        border-radius: 0.375rem;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .select-search-input:focus {
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgba(13,110,253,.25);
      }
    }

    div.select-search-select {
        background: #fff;
        box-shadow: 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.15);
        border: 1px solid #ced4da;
        border-radius: 0.375rem;

        .select-search-option, .select-search-not-found {
          padding: 0 16px;
          background:#fff;
          color: #212529;
        }

        .select-search-options {
          padding-left: 0px;

          .select-search-row {

            .select-search-option:hover{
              background: 'grey';
            }

          }
        }

       
    }
  }
`

export default function Index(payload) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState([])
  const formInstant = useForm()
  const {
    handleSubmit,
    formState,
    control,
    getValues,
    setValue,
    reset
  } = formInstant
  const { errors } = formState

  const handleShow = () => {
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
    reset()
  }

  const [getStudents] = useLazyQuery(GET_UNENROLLED_QUERY)

  const [mutateEnroll, { loading: loadingEnrollment }] = useMutation(
    ENROLL_STUDENT_MUTATION,
    {
      awaitRefetchQueries: true,
      refetchQueries: ['GET_ENROLLEES'],
      onCompleted: () => {
        handleClose()
      },
      onError: (error) => {
        console.log('Mutate.error', error)
      }
    }
  )

  const doEnroll = useCallback((props) => {
    const { schoolYearId, paymentType, amount, remarks } = props
    // console.log({ props })
    mutateEnroll({
      variables: {
        ...props,
        schoolYearId: parseInt(schoolYearId),
        paymentType,
        amount: parseFloat(amount),
        others: { remarks }
      }
    })
  })

  const onSubmit = useCallback((data) => {
    handleSubmit(doEnroll)()
  })

  const getOptions = useCallback(() => {
    async function doFetch() {
      const fetched = await getStudents({
        // variables: { search },
      })
      const data = _.has(fetched, 'data') ? fetched.data : null
      const result = _.has(data, 'getUnenrolledStudents')
        ? data.getUnenrolledStudents
        : null

      const rows = _.map(result, (row) => {
        const id = _.has(row, 'id') ? row.id : null
        const profile = _.has(row, 'profile') ? row.profile : null

        return {
          value: parseInt(id),
          name: `${profile.firstName} ${profile.lastName}`
        }
      })

      return rows
    }

    return doFetch()
  }, [getStudents])

  return (
    <>
      <Button variant='secondary' onClick={handleShow} disabled={loading}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FontAwesomeIcon icon={solid('user-plus')} /> Enroll a Student
          </>
        )}
      </Button>

      <Modal size='md' show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Enroll a Student
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Row>
              <Col lg={12}>
                <StyledRow>
                  <Col>
                    <Form.Group
                      className='form-group'
                      controlId='enroll.studentId'
                    >
                      <Form.Label>Student</Form.Label>
                      <Controller
                        name='studentId'
                        control={control}
                        rules={{ required: 'Field is required.' }}
                        render={({ field }) => (
                          <SelectSearch
                            isInvalid={!!_.has(errors, 'studentId')}
                            {...field}
                            getOptions={getOptions}
                            name='language'
                            placeholder={'Select Student'}
                            search
                            menuPlacement='auto'
                          />
                        )}
                        // {...etc}
                      />
                      <p
                        className='text-danger mt-1'
                        style={{ fontSize: '.875em' }}
                      >
                        {_.has(errors, 'studentId')
                          ? errors.studentId.message
                          : ''}
                      </p>
                    </Form.Group>
                  </Col>
                </StyledRow>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <SelectEnrollmentSY {...formInstant} />
              </Col>
            </Row>

            <Row>
              <Col>
                <SelectGradeLevels {...formInstant} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Payment formInstant={formInstant} />
              </Col>
            </Row>

            <Row>
              <Form.Group
                as={Col}
                sm={12}
                controlId='enrollment.remarks'
                className='mb-3'
              >
                <Form.Label>Remarks</Form.Label>
                <Controller
                  name='remarks'
                  control={control}
                  rules={{ required: 'Remarks is required.' }}
                  render={({ field }) => (
                    <Form.Control as='textarea' rows={3} {...field} />
                  )}
                />
                <Form.Control.Feedback type='invalid'>
                  {_.has(errors, 'remarks')
                    ? errors.remarks.message
                    : 'Invalid remarks.'}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* <Row>
              <Col>
                <UploadFiles {...formInstant} />
              </Col>
            </Row> */}
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
                <FontAwesomeIcon icon={solid('check')} /> Enroll
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const Payment = ({ formInstant }) => {
  const { formState, control, watch, setValue } = formInstant
  const { errors } = formState
  const [paymentLabel, setPaymentLabel] = useState()

  const watchPayment = watch('paymentType')

  useEffect(() => {
    switch (watchPayment) {
      case 'FULL':
        setPaymentLabel('Full Amount')
        break
      case 'PARTIAL':
        setPaymentLabel('Initial Amount')
        break
      case 'false':
        setValue('paymentType', null)
      default:
        setPaymentLabel('Amount')
    }
  }, [watchPayment])

  const validateAmount = (value) => {
    var reg = /^[+-]?\d+(\.\d+)?$/
    const valid = reg.test(value)

    if (!valid) {
      return 'Invalid amount'
    }

    return true
  }

  return (
    <Row>
      <Form.Group as={Col} sm={12} controlId='enrollment.paymentType'>
        <Form.Label>Payment passwordType</Form.Label>
        <Controller
          name='paymentType'
          control={control}
          rules={{ required: 'Payment type is required.' }}
          render={({ field }) => (
            <Form.Select isInvalid={!!_.has(errors, 'paymentType')} {...field}>
              <option value={false}>Select Payment Type</option>
              <option value='FULL'>Full</option>
              <option value='PARTIAL'>Partial</option>
            </Form.Select>
          )}
        />
        <p className='text-danger mt-1' style={{ fontSize: '.875em' }}>
          {_.has(errors, 'paymentType') ? errors.paymentType.message : ''}
        </p>
      </Form.Group>

      <Form.Group as={Col} sm={12} controlId='enrollment.amount'>
        <Form.Label>{paymentLabel}</Form.Label>
        <Controller
          name='amount'
          control={control}
          rules={{
            required: 'Field is required.',
            validate: validateAmount
          }}
          render={({ field }) => (
            <Form.Control isInvalid={!!_.has(errors, 'amount')} {...field} />
          )}
        />
        <p className='text-danger mt-1' style={{ fontSize: '.875em' }}>
          {_.has(errors, 'amount') ? errors.amount.message : ''}
        </p>
      </Form.Group>

      <UploadFiles {...formInstant} />
    </Row>
  )
}
