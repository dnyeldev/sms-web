/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from './gql';
import client from '../../../RegistryClient';
import LoginContext from '../../login/login.context';
import useCreateAuditTrail from '../../auditTrail/useCreateAuditTrail';
import { AlertError } from '../../../components'

export default function UserForm({ onCancel, onSuccess }) {
  const { userUid } = useContext(LoginContext);
  const { doInsertAuditTrail } = useCreateAuditTrail();
  const [error, setError] = useState(null)

  const {
    handleSubmit, formState, control, watch,
  } = useForm();
  const { errors } = formState;

  const [saveUser, { loading }] = useMutation(CREATE_USER, {
    client,
    refetchQueries: ['GetAllUsers'],
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    saveUser({
      variables: { ...data, createdBy: userUid },
    }).then(() => {
      doInsertAuditTrail({
        action: 'CREATE',
        changes: `Created ${data.firstName} ${data.lastName}`,
        module: 'User Management',
      });

      if (onSuccess) {
        onSuccess();
      }
    }).catch(err => {
      setError(err.toString())
    })
  };

  const isValidEmail = (email) =>
    // eslint-disable-next-line no-useless-escape, implicit-arrow-linebreak
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    );

  return (
    <div className="row">
      <div className="col-sm-12">
        <Form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create User</h4>
              <div className="profile-box">
                <Row>
                  {error && (
                    <Col lg={12}>
                      <AlertError
                        error={error}
                        title="Failed to create user"
                        onClose={() => setError(null)}
                      />
                    </Col>
                  )}
                  <Col>
                    <Form.Group className="form-group" controlId="createUser.controlInput4">
                      <Form.Label className="form-control-label">User Role</Form.Label>
                      <Controller
                        name="roleCode"
                        control={control}
                        rules={{ required: 'Role is required.' }}
                        autoFocus
                        render={({ field }) => (
                          <Form.Select
                            autoFocus
                            isInvalid={!!_.has(errors, 'roleCode')}
                            {...field}
                          >
                            <option value="">Select Role</option>
                            <option value="SUPERADMIN">Super Admin</option>
                            <option value="MARKETING_ADMIN">Marketing Admin</option>
                            <option value="PARTNER_MERCHANT">Partner Merchant</option>
                            <option value="SUPPORT">Support</option>
                          </Form.Select>
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {_.has(errors, 'roleCode') ? errors.roleCode.message : 'Invalid role.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={5}>
                    <Form.Group className="form-group" controlId="createUser.controlInput1">
                      <Form.Label>First Name</Form.Label>
                      <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: 'First name is required.' }}
                        render={({ field }) => (
                          <Form.Control
                            autoFocus
                            isInvalid={!!_.has(errors, 'firstName')}
                            {...field}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {_.has(errors, 'firstName') ? errors.firstName.message : 'Invalid first name.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={2}>
                    <Form.Group className="form-group" controlId="registerTutor.controlInput2">
                      <Form.Label>MI</Form.Label>
                      <Controller
                        name="middleInitial"
                        control={control}
                        rules={{ maxLength: { value: 3, message: 'Max length is 3.' } }}
                        render={({ field }) => (
                          <Form.Control
                            autoFocus
                            isInvalid={!!_.has(errors, 'middleInitial')}
                            {...field}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {_.has(errors, 'middleInitial') ? errors.middleInitial.message : 'Invalid middle initial.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={5}>
                    <Form.Group className="form-group" controlId="createUser.controlInput3">
                      <Form.Label className="form-control-label">Last Name</Form.Label>
                      <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: 'Last name is required.' }}
                        autoFocus
                        render={({ field }) => (
                          <Form.Control
                            autoFocus
                            isInvalid={!!_.has(errors, 'lastName')}
                            {...field}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {_.has(errors, 'lastName') ? errors.lastName.message : 'Invalid last name.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="form-group" controlId="registerTutor.controlInput4">
                      <Form.Label className="form-control-label">Email Address</Form.Label>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: 'Email is required.',
                          validate: {
                            isValidEmail: (value) => isValidEmail(value) || 'Invalid Email Address',
                          },
                        }}
                        autoFocus
                        render={({ field }) => (
                          <Form.Control
                            autoFocus
                            type="email"
                            isInvalid={!!_.has(errors, 'email')}
                            {...field}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {_.has(errors, 'email') ? errors.email.message : 'Invalid email.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="form-group" controlId="registerTutor.controlInput4">
                      <Form.Label className="form-control-label">Username</Form.Label>
                      <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'Username is required.' }}
                        autoFocus
                        render={({ field }) => (
                          <Form.Control
                            autoFocus
                            type="text"
                            isInvalid={!!_.has(errors, 'username')}
                            {...field}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {_.has(errors, 'username') ? errors.username.message : 'Invalid username.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg="6">
                    <Form.Group className="form-group" controlId="registerTutor.controlInput4">
                      <Form.Label className="form-control-label">Password</Form.Label>
                      <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Password is required.' }}
                        autoFocus
                        render={({ field }) => (
                          <Form.Control
                            autoFocus
                            type="password"
                            isInvalid={!!_.has(errors, 'password')}
                            {...field}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {_.has(errors, 'password') ? errors.password.message : 'Invalid password.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg="6">
                    <Form.Group className="form-group" controlId="registerTutor.controlInput4">
                      <Form.Label className="form-control-label">Confirm Password</Form.Label>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{
                          required: 'Confirm password is required.',
                          validate: (value) => value === watch('password') || 'The passwords do not match',
                        }}
                        render={({ field }) => (
                          <Form.Control
                            autoFocus
                            type="password"
                            isInvalid={!!_.has(errors, 'confirmPassword')}
                            {...field}
                          />
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {_.has(errors, 'confirmPassword') ? errors.confirmPassword.message : 'Invalid confirm password.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

              </div>
            </div>
            <div className="card-footer">
              <Button variant="warning" onClick={() => onCancel()} disabled={loading}>Cancel</Button>
              {' '}
              <Button type="submit" variant="primary" disabled={loading}>{!loading ? 'Save' : 'Saving'}</Button>
            </div>
          </div>
        </Form>
      </div>

    </div>
  );
}
