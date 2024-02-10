import React, { useCallback, useState } from 'react'
import 'react-select-search/style.css'
import _ from 'lodash'
import { Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { LoadingSpinner } from '../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Controller, useForm } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { GET_UNENROLLED_QUERY, PAY_STUDENT } from './gql'
import UploadFiles from '../../../components/UploadFiles'

const validateAmount = (value) => {
  var reg = /^[+-]?\d+(\.\d+)?$/
  const valid = reg.test(value)

  if (!valid) {
    return 'Invalid amount'
  }

  return true
}

export default function Index(payload) {
  const [visible, setVisible] = useState(false)
  const { enrolleeId } = payload
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

  const [mutatePay, { loading }] = useMutation(PAY_STUDENT, {
    update: (cache, { data }) => {
      const { payStudent } = data

      cache.modify({
        id: `Enrollment:${enrolleeId}`,
        fields: {
          payments(cur) {
            const newPayment = cache.writeFragment({
              data: payStudent,
              fragment: gql`
                fragment NewRef on Payment {
                  id
                  type
                  referenceId
                  amount
                  paymentType
                  status
                  createdAt
                  createdBy
                }
              `
            })

            const records = [...cur]

            if (newPayment) records.push(newPayment)

            return records
          }
        }
      })
    },
    onCompleted: () => {
      handleClose()
    },
    onError: (error) => {
      console.log('Mutate.error', error)
    }
  })

  const doEnroll = useCallback((props) => {
    const { files, paymentType, amount, remarks } = props

    mutatePay({
      variables: {
        referenceId: enrolleeId,
        paymentType,
        amount: parseFloat(amount),
        files,
        others: { remarks }
      }
    })
  })

  const onSubmit = useCallback((data) => {
    handleSubmit(doEnroll)()
  })

  return (
    <>
      <Button variant='link' onClick={handleShow} disabled={loading}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <FontAwesomeIcon icon={solid('money-check-dollar')} /> Add Payment
          </>
        )}
      </Button>

      <Modal size='md' show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Pay Student
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Row>
              <Form.Group as={Col} sm={12} controlId='enrollment.amount'>
                <Form.Label>Amount</Form.Label>
                <Controller
                  name='amount'
                  control={control}
                  rules={{
                    required: 'Field is required.',
                    validate: validateAmount
                  }}
                  render={({ field }) => (
                    <Form.Control
                      isInvalid={!!_.has(errors, 'amount')}
                      {...field}
                    />
                  )}
                />
                <p className='text-danger mt-1' style={{ fontSize: '.875em' }}>
                  {_.has(errors, 'amount') ? errors.amount.message : ''}
                </p>
              </Form.Group>

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

              <UploadFiles
                {...formInstant}
                label='Attach Files'
                placeholder='Receipt/Proof of Payments Image'
              />
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
                <FontAwesomeIcon icon={solid('check')} /> Add Payment
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
