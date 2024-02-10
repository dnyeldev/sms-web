import React, { useCallback, useEffect, useState } from 'react'

import {
  Modal,
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  Badge
} from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import _ from 'lodash'
import { gql, useMutation, useQuery } from '@apollo/client'
import { LoadingSpinner } from '.'
import UserEmpty from '../../../assets/user-empty.png'
import { getUserQuery } from './gql'
import moment from 'moment'

export default function Index({ children, userId }) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState(null)
  const [gender, setGender] = useState(null)
  const [birthDay, setBirthDay] = useState(null)
  const [address, setAddress] = useState(null)
  const [status, setStatus] = useState(null)

  const { data: userResult, loading: loadingUser } = useQuery(getUserQuery, {
    skip: !userId,
    variables: { id: userId }
  })
  // console.log({ userResult })
  // const [doChangeStatus, { loading: loadingChangeStatus }] = useMutation(
  //   changeUserStatusMutation,
  //   {
  //     onCompleted() {
  //       setVisible(false)
  //       reset()
  //     }
  //   }
  // )

  useEffect(() => {
    if (userResult) {
      const iUser = _.has(userResult, 'getUser') ? userResult.getUser : null
      const iProfile = _.has(iUser, 'profile') ? iUser.profile : null
      const iStatus = _.has(iUser, 'status') ? iUser.status : null
      const fName = _.has(iProfile, 'firstName') ? iProfile.firstName : null
      const lName = _.has(iProfile, 'lastName') ? iProfile.lastName : null
      const iFullName = `${fName} ${lName}`
      const iGender = _.has(iProfile, 'gender') ? iProfile.gender : null
      const iAddress = _.has(iProfile, 'address') ? iProfile.address : null
      const iBirthDay = _.has(iProfile, 'birthDay')
        ? moment(iProfile.birthDay).format('ll')
        : null

      setFullName(iFullName)
      setGender(iGender)
      setStatus(iStatus || '')

      if (iAddress) {
        const { address1, address2, city, postalCode, countryCode } = iAddress
        let parsed = [address1, address2, city, postalCode, countryCode]

        setAddress(_.join(parsed, ', '))
      }
      setBirthDay(iBirthDay || '')
    }
  }, [userResult])

  // useEffect(() => {
  //   const user = _.has(userResult, 'getUser') ? userResult.getUser : null
  //   const status = _.has(user, 'status') ? user.status : null

  //   setValue('status', status)
  // }, [userResult])

  // const changeStatus = useCallback(
  //   (props) => {
  //     async function doSubmit() {
  //       // setLoading(true);

  //       const status = _.has(props, 'status') ? props.status : null

  //       console.log({ userId, status })
  //       await doChangeStatus({ variables: { id: userId, status } })

  //       // setLoading(false);
  //     }

  //     doSubmit()
  //   },
  //   [userId]
  // )

  // const submitForm = useCallback((data) => {
  //   handleSubmit(changeStatus)()
  // })

  const handleShow = useCallback(() => {
    setVisible(true)
  }, [children])

  return (
    <>
      <Button variant='link' onClick={handleShow}>
        {children}
      </Button>

      <Modal show={visible} onHide={() => setVisible(false)} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>View Student</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col lg={{ span: 4 }}>
              <Card>
                <Card.Img variant='top' src={UserEmpty} />
              </Card>
            </Col>
            <Col lg={{ span: 8 }}>
              <ListGroup as='ul'>
                <ListGroup.Item
                  as='li'
                  className='d-flex justify-content-between align-items-start'
                >
                  <div className='ms-2 me-auto'>
                    <div className='fw-bold'>Full Name</div>
                    {fullName}
                  </div>
                  <Badge bg='primary' pill>
                    {status}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item
                  as='li'
                  className='d-flex justify-content-between align-items-start'
                >
                  <div className='ms-2 me-auto'>
                    <div className='fw-bold'>Gender</div>
                    {gender}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as='li'
                  className='d-flex justify-content-between align-items-start'
                >
                  <div className='ms-2 me-auto'>
                    <div className='fw-bold'>Birth Date</div>
                    {birthDay}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as='li'
                  className='d-flex justify-content-between align-items-start'
                >
                  <div className='ms-2 me-auto'>
                    <div className='fw-bold'>Address</div>
                    {address}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          {/* <Form noValidate>
            <Row>
              <Col lg={12}>
                <Row className='mb-3'>
                  <Form.Group as={Col} sm={12} controlId='select.role'>
                    <Form.Label>Status</Form.Label>
                    <Controller
                      name='status'
                      control={control}
                      rules={{ required: 'Field is required.' }}
                      render={({ field }) => (
                        <Form.Select
                          isInvalid={!!_.has(errors, 'status')}
                          {...field}
                        >
                          <option value='INACTIVE'>INACTIVE</option>
                          <option value='ACTIVE'>ACTIVE</option>
                        </Form.Select>
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'status')
                        ? errors.status.message
                        : 'Invalid status.'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Col>
            </Row>
          </Form> */}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='link'
            onClick={() => setVisible(false)}
            disabled={loading}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
