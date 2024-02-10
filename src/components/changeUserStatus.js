import React, { useCallback, useEffect, useState } from 'react';

import {
  Modal, Button, Row, Col, Form
} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash'
import { gql, useMutation, useQuery } from '@apollo/client';
import { LoadingSpinner } from '.';

const getUserQuery = gql`
  query Query($id: ID!) {
    getUser(id: $id){
      id
      roleCode
      status
      username
      profile {
        id
        userId
        firstName
        middleName
        lastName
        email
        mobile
        birthDay
        address
        __typename
      }
      __typename
    }
  }
`

const changeUserStatusMutation = gql`
  mutation Mutate($id: ID! $status: UserStatus!) {
    changeUserStatus(id: $id status: $status) {
      id
      roleCode
      status
      __typename
    }
  }
`

export default function modalConfirm({ children, userId }) {
  const [visible, setVisible] = useState(false);
  const formInstant = useForm();
  const {
    handleSubmit, formState, control, getValues, setValue, reset
  } = formInstant;
  const { errors } = formState;
  const [loading, setLoading] = useState(false)

  const { data: userResult, loading: loadingUser } = useQuery(getUserQuery, {
    skip: !userId,
    variables: { id: userId }
  })

  const [doChangeStatus, { loading: loadingChangeStatus }] = useMutation(changeUserStatusMutation, {
    onCompleted() {
      setVisible(false)
      reset()
    }
  })

  useEffect(() => {
    if (loadingChangeStatus || loadingUser) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [loadingUser, loadingChangeStatus])

  useEffect(() => {
    const user = _.has(userResult, 'getUser') ? userResult.getUser : null
    const status = _.has(user, 'status') ? user.status : null

    setValue('status', status)
  }, [userResult])

  const changeStatus = useCallback((props) => {
    async function doSubmit() {
      // setLoading(true);

      const status = _.has(props, 'status') ? props.status : null

      console.log({ userId, status })
      await doChangeStatus({ variables: { id: userId, status } })

      // setLoading(false);
    }

    doSubmit();
  }, [userId]);

  const submitForm = useCallback((data) => {
    handleSubmit(changeStatus)();
  });

  const handleShow = useCallback(() => {
    setVisible(true)
  }, [children])

  return (
    <>
      {children({ onClick: handleShow })}
      <Modal show={visible} onHide={() => setVisible(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change User Status</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate>
            <Row>
              <Col lg={12}>
                <Row className="mb-3">
                  <Form.Group as={Col} sm={12} controlId="select.role">
                    <Form.Label>Status</Form.Label>
                    <Controller
                      name="status"
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
                    <Form.Control.Feedback type="invalid">
                      {_.has(errors, 'status') ? errors.status.message : 'Invalid status.'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="link" onClick={() => setVisible(false)} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" onClick={() => submitForm()} disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
