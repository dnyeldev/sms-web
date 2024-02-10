import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
  Modal, Button, Row, Col, Form
} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash'
import { gql, useMutation, useQuery } from '@apollo/client';
import { LoadingSpinner } from '../../components';
import { GET_SCHOOL_YEAR, CHANGE_SY_STATUS_MUTATION } from './gql';
import SCHOOL_YEAR_STATUS from '../../constants/schoolYearStatus'
import { LoginContext } from '../../pages/login';

export default function modalConfirm({ children, id }) {
  const [visible, setVisible] = useState(false);
  const formInstant = useForm();
  const {
    handleSubmit, formState, control, getValues, setValue, reset
  } = formInstant;
  const { errors } = formState;
  const [loading, setLoading] = useState(false)
  const { userId } = useContext(LoginContext)

  const { data: syData, loading: loadingSy } = useQuery(GET_SCHOOL_YEAR, {
    skip: !id,
    variables: { id }
  })

  const [doChangeStatus, { loading: loadingChangeStatus }] = useMutation(CHANGE_SY_STATUS_MUTATION, {
    onCompleted() {
      setVisible(false)
      reset()
    }
  })

  useEffect(() => {
    if (loadingChangeStatus || loadingSy) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [loadingSy, loadingChangeStatus])

  useEffect(() => {
    const sy = _.has(syData, 'getSchoolYear') ? syData.getSchoolYear : null
    const status = _.has(sy, 'status') ? sy.status : null

    setValue('status', status)
  }, [syData])

  const changeStatus = useCallback((props) => {
    async function doSubmit() {
      // setLoading(true);

      const status = _.has(props, 'status') ? props.status : null

      await doChangeStatus({ variables: { id, status, updatedBy: userId } })

      // setLoading(false);
    }

    doSubmit();
  }, [id, userId]);

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
          <Modal.Title>Change School Year Status</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate>
            <Row>
              <Col lg={12}>
                <Row className="mb-3">
                  <Form.Group as={Col} sm={12} controlId="sy.status">
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
                          {
                            SCHOOL_YEAR_STATUS.map(stat => {
                              return <option>{stat}</option>
                            })
                          }
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
