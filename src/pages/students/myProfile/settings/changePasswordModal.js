import React, {
  createContext,
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useMutation } from '@apollo/client';
import _ from 'lodash';
import {
  Form, Button, Modal, Row, Col, Alert, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { AlertError } from '../../../../components';
// import RegistryClient from '../../../../RegistryClient';
import { LoginContext } from '../../../login';
import { changePasswordMutation } from './gql';
// import useCreateAuditTrail from '../../../auditTrail/useCreateAuditTrail'
import styledComponents from 'styled-components'

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

const PageContext = createContext();

export default function Index() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit, formState, control, getValues,
  } = useForm();
  const { errors } = formState;
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const { userUid } = useContext(LoginContext);
  const [error, setError] = useState(null);
  // const { doInsertAuditTrail, userFullName } = useCreateAuditTrail()
  const [passwordType, setPasswordType] = useState('password')
  const [newPasswordType, setNewPasswordType] = useState('password')
  const [confPasswordType, setConfPasswordType] = useState('password')

  const togglePasswordType = useCallback(() => {
    const type = passwordType === 'password' ? 'text' : 'password'

    setPasswordType(type)
  }, [passwordType])

  const toggleNewPasswordType = useCallback(() => {
    const type = newPasswordType === 'password' ? 'text' : 'password'

    setNewPasswordType(type)
  }, [newPasswordType])

  const toggleConfPasswordType = useCallback(() => {
    const type = confPasswordType === 'password' ? 'text' : 'password'

    setConfPasswordType(type)
  }, [confPasswordType])

  // const [changePassword] = useMutation(changePasswordMutation, {
  //   client: RegistryClient,
  //   onCompleted: () => {
  //     doInsertAuditTrail({
  //       action: 'UPDATE',
  //       changes: `${userFullName} updated his/her password`,
  //       module: 'Profile Settings',
  //     });

  //     setVisible(false);
  //     setSuccess(true);
  //   },
  //   onError: (err) => {
  //     const message = _.has(err, 'message') ? err.message : null;

  //     if (setError) {
  //       setError(message);
  //     }
  //     setSuccess(false);
  //   },
  // });

  const onSubmit = useCallback((values) => {
    const currentPassword = _.has(values, 'currentPassword') ? values.currentPassword : null;
    const newPassword = _.has(values, 'newPassword') ? values.newPassword : null;

    async function doSubmit() {
      setLoading(true);

      const variables = { userUid, currentPassword, newPassword };
      // await changePassword({ variables });

      setLoading(false);
    }

    doSubmit();
  }, [userUid]);

  const onShow = useCallback(() => {
    setVisible(true);
  });

  const onClose = useCallback(() => {
    setVisible(false);
  });

  const triggerSubmit = useCallback(() => {
    handleSubmit(onSubmit)();
  });

  const contextPayload = useMemo(() => ({ success }), [success]);

  return (
    <PageContext.Provider value={contextPayload}>
      <OverlayTrigger
        key="change-password"
        placement="top"
        overlay={(
          <Tooltip id="tooltip-change-password">
            Change Password
          </Tooltip>
        )}
      >
        <Button
          className="text-warning"
          variant="link"
          onClick={onShow}
        >
          <FontAwesomeIcon icon={solid('user-gear')} />
          {' '}
          Password
        </Button>
      </OverlayTrigger>

      <Modal
        show={visible}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="form-group" as={Col} controlId="changePassword.password" lg={{ span: 12 }}>
                <Form.Label className="form-control-label">Current Password</Form.Label>
                <Controller
                  name="currentPassword"
                  control={control}
                  rules={{ required: 'Current password is required.' }}
                  autoFocus
                  render={({ field }) => (
                    <Form.Control
                      autoFocus
                      type={passwordType}
                      isInvalid={!!_.has(errors, 'currentPassword')}
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
                  {_.has(errors, 'currentPassword') ? errors.currentPassword.message : 'Invalid current password.'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-group" as={Col} controlId="changePassword.newPassword">
                <Form.Label className="form-control-label">New Password</Form.Label>
                <Controller
                  name="newPassword"
                  control={control}
                  rules={{ required: 'New password is required.' }}
                  autoFocus
                  render={({ field }) => (
                    <Form.Control
                      autoFocus
                      type={newPasswordType}
                      isInvalid={!!_.has(errors, 'newPassword')}
                      {...field}
                    />
                  )}
                />
                <ViewToggle>
                  <i>
                    <FontAwesomeIcon
                      className={newPasswordType === 'text' ? 'active' : ''}
                      icon={regular('eye')}
                      onClick={toggleNewPasswordType}
                    />
                  </i>
                </ViewToggle>
                <Form.Control.Feedback type="invalid">
                  {_.has(errors, 'newPassword') ? errors.newPassword.message : 'Invalid new password.'}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-group" as={Col} controlId="changePassword.confirmPassword">
                <Form.Label className="form-control-label">Confirm Password</Form.Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: 'Confirm password is required.',
                    validate: {
                      missMatched: (value) => value === getValues('newPassword'),
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
          </Form>

          {error && <AlertError error={error} title="Result Error!" onClose={() => setError(null)} />}

        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="link"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={triggerSubmit}
          >
            <FontAwesomeIcon icon={solid('floppy-disk')} />
            {' '}
            {loading ? 'Loading…' : 'Confirm'}
          </Button>
        </Modal.Footer>
      </Modal>

      <SuccessConfirmModal />
    </PageContext.Provider>
  );
}

function SuccessConfirmModal() {
  const { success } = useContext(PageContext);
  const [visible, setVisible] = useState(false);
  const { logout } = useContext(LoginContext);

  useEffect(() => {
    setVisible(success);
  }, [success]);

  const onConfirm = useCallback(() => {
    logout();
  });

  return (
    <Modal
      show={visible}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Change Password Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="success">
          <Alert.Heading>
            <FontAwesomeIcon icon={solid('thumbs-up')} />
            {' '}
            Great!
          </Alert.Heading>
          <p>You have successfully change your password. You are require to re-login.</p>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
