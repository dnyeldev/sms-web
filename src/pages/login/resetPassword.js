import React, {
  createContext,
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';
import {
  Form, Button, Modal, Alert, Row, Col,
} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import RegistryClient from '../../RegistryClient';
import {
  getResetPasswordQuery,
  resetPasswordMutation,
} from './gql'
import styledComponents from 'styled-components'

const PageContext = createContext()

const ViewToggle = styledComponents.div`
  color: #757575;
  cursor: pointer;
  display: flex;
  position: relative;

  i {
    position: absolute;
    top: -2.1em;
    right: 1em;
  }

  .active {
    color: #FE9445;
  }
`

const StyledButtonNav = styledComponents(Button)`
  padding: unset;
  font-size: inherit;
  margin: unset;
  line-height: unset;
  text-align: unset;
  vertical-align: unset;
  border: unset;
  border-radius: unset;
`;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit, formState, control, getValues, setError
  } = useForm();
  const { errors } = formState;
  const params = useParams();
  const { uid } = params;
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(null)
  const [passwordType, setPasswordType] = useState('password')
  const [confPasswordType, setConfPasswordType] = useState('password')

  const { data: resetPasswordResult, loading: fetchLoading } = useQuery(getResetPasswordQuery, {
    client: RegistryClient,
    skip: !uid,
    variables: { uid },
  });

  const [resetMutation] = useMutation(resetPasswordMutation, {
    client: RegistryClient,
    onCompleted: () => {
      setSuccess(true);
    },
    onError: (error) => {
      setError('password', { type: 'custom', message: error.toString() })
      setSuccess(false)
    },
  });

  useEffect(() => {
    setLoading(fetchLoading);
  }, [fetchLoading]);

  useEffect(() => {
    const reset = _.has(resetPasswordResult, 'getResetPassword') ? resetPasswordResult.getResetPassword : null;
    const iStatus = _.has(reset, 'status') ? reset.status : null;

    setStatus(iStatus);
  }, [resetPasswordResult]);

  const onSubmit = useCallback((values) => {
    const password = _.has(values, 'password') ? values.password : null;

    async function doSubmit() {
      setLoading(true);

      await resetMutation({ variables: { uid, password } })

      setLoading(false);
    }

    doSubmit();
  }, [uid]);

  const contextPayload = useMemo(() => ({
    success,
    status,
  }), [success, status])

  const togglePasswordType = useCallback(() => {
    const type = passwordType === 'password' ? 'text' : 'password'

    setPasswordType(type)
  }, [passwordType])

  const toggleConfPasswordType = useCallback(() => {
    const type = confPasswordType === 'password' ? 'text' : 'password'

    setConfPasswordType(type)
  }, [confPasswordType])

  return (
    <PageContext.Provider value={contextPayload}>
      <div className="bg-pattern-style">
        <div className="content">
          <div className="account-content">
            <div className="account-box">
              <div className="login-right">
                <div className="login-header">
                  <h3>Reset Password</h3>
                </div>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Form.Group className="form-group" as={Col} controlId="registerTutor.password">
                      <Form.Label className="form-control-label">New Password</Form.Label>
                      <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Password is required.' }}
                        autoFocus
                        render={({ field }) => (
                          <Form.Control
                            autoFocus
                            type={passwordType}
                            isInvalid={!!_.has(errors, 'password')}
                            {...field}
                          />
                        )}
                      />
                      <ViewToggle>
                        <i>
                          <FontAwesomeIcon
                            className={passwordType === 'text' ? 'active' : ''}
                            icon={regular('eye')}
                            onClick={togglePasswordType}
                          />
                        </i>
                      </ViewToggle>
                      <Form.Control.Feedback type="invalid">
                        {_.has(errors, 'password') ? errors.password.message : 'Invalid password.'}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-group" as={Col} controlId="registerTutor.confirmPassword">
                      <Form.Label className="form-control-label">Confirm Password</Form.Label>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        rules={{
                          required: 'Confirm password is required.',
                          validate: {
                            missMatched: (value) => value === getValues('password'),
                          },
                        }}
                        autoFocus
                        render={({ field }) => (
                          <Form.Control
                            autoFocus
                            type={confPasswordType}
                            isInvalid={!!_.has(errors, 'confirmPassword')}
                            {...field}
                          />
                        )}
                      />
                      <ViewToggle>
                        <i>
                          <FontAwesomeIcon
                            className={confPasswordType === 'text' ? 'active' : ''}
                            icon={regular('eye')}
                            onClick={toggleConfPasswordType}
                          />
                        </i>
                      </ViewToggle>
                      <Form.Control.Feedback type="invalid">
                        {_.has(errors, 'confirmPassword') ? errors.confirmPassword.message : 'Invalid confirm password.'}
                        {_.has(errors, 'confirmPassword') && errors.confirmPassword.type === 'missMatched' && 'Password mismatched'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Button
                    className="btn btn-primary login-btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Loading…' : 'Reset'}
                  </Button>
                </Form>

                <div className="text-center dont-have">
                  Back to
                  {' '}
                  {/* <a href="javascript:void(0)" onClick={() => navigate('/login')}>Login</a> */}
                  <StyledButtonNav variant='button' onClick={() => navigate('/login')}>Login</StyledButtonNav>
                </div>
              </div>
            </div>
          </div>

          <SuccessConfirmModal />
          <ExpiredPasswordModal />
          <CompletedPasswordModal />
        </div>
      </div>
    </PageContext.Provider>
  );
}

function SuccessConfirmModal() {
  const { success } = useContext(PageContext);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(success);
  }, [success]);

  const onConfirm = useCallback(() => {
    navigate('/login', { replace: true });
  });

  return (
    <Modal
      show={visible}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Reset Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="success">
          <Alert.Heading>
            <FontAwesomeIcon icon={solid('thumbs-up')} />
            {' '}
            Great!
          </Alert.Heading>
          <p>You have successfully reset your password.</p>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ExpiredPasswordModal() {
  const { success, status } = useContext(PageContext);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!success && status === 'EXPIRED') { setVisible(status); }
  }, [success, status]);

  const onConfirm = useCallback(() => {
    navigate('/forgot', { replace: true });
  });

  return (
    <Modal
      show={visible}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Expired Link!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">
          <Alert.Heading>
            <FontAwesomeIcon icon={solid('bomb')} />
            {' '}
            Sorry!
          </Alert.Heading>
          <p>Reset link expired, please generate a new link.</p>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

function CompletedPasswordModal() {
  const { success, status } = useContext(PageContext);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!success && status === 'COMPLETED') { setVisible(status); }
  }, [success, status]);

  const onConfirm = useCallback(() => {
    navigate('/login', { replace: true });
  });

  return (
    <Modal
      show={visible}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Request Already Completed!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="warning">
          <Alert.Heading>
            <FontAwesomeIcon icon={solid('exclamation-circle')} />
            {' '}
            Sorry!
          </Alert.Heading>
          <p>Reset password link already completed!</p>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
