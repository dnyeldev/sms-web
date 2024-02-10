import React, {
  createContext,
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import {
  Form, Button, Modal, Alert,
} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import NotificationClient from '../../NotificationClient';
import RegistryClient from '../../RegistryClient';
import { createResetPasswordMutation, sendSystemEmailMutation } from './gql'
import styledComponents from 'styled-components';

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

const PageContext = createContext();

const getAbsoluteUrl = (function Url() {
  let a;
  return function Absolute(url) {
    if (!a) a = document.createElement('a');
    a.href = url;
    return a.href;
  };
}());

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, formState, control } = useForm();
  const { errors } = formState;
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(null);

  const [createReset] = useMutation(createResetPasswordMutation, {
    client: RegistryClient,
  });

  const [sendEmail] = useMutation(sendSystemEmailMutation, {
    client: NotificationClient,
    onCompleted: () => {
      setSuccess(true);
    },
  });

  const onSubmit = useCallback((values) => {
    const iEmail = _.has(values, 'email') ? values.email : null;

    async function doSubmit() {
      setLoading(true);

      await createReset({ variables: { email: iEmail } })
        .then(({ data }) => {
          const reset = _.has(data, 'createResetPassword') ? data.createResetPassword : null;
          const resetUid = _.has(reset, 'uid') ? reset.uid : null;
          const url = getAbsoluteUrl('/');
          const resetLink = `${url}reset/${resetUid}`;

          const variables = {
            to: iEmail,
            subject: 'Learnlive Password Reset',
            html: `
              <h5>Hi,</h5>
              <p>Please click the link below to reset your password.</p>
              <a href="${resetLink}">Reset Link</a>

              <p><small>@NOTE this link will expire in 15 minutes.</small></p>
            `,
          };

          return sendEmail({ variables });
        });

      setEmail(iEmail);
      setLoading(false);
    }

    doSubmit();
  });

  const contextPayload = useMemo(() => ({
    success,
    email,
  }), [success, email]);

  return (
    <PageContext.Provider value={contextPayload}>
      <div className="bg-pattern-style">
        <div className="content">
          <div className="account-content">
            <div className="account-box">
              <div className="login-right">
                <div className="login-header">
                  <h3>
                    <FontAwesomeIcon icon={solid('lock')} />
                    {' '}
                    Forgot Password
                  </h3>
                  <p className="text-muted">We will send a reset link via email</p>
                </div>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="form-group" controlId="login.username">
                    <Form.Label>Email</Form.Label>
                    <Controller
                      name="email"
                      control={control}
                      rules={{
                        required: 'email is required.',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email format!',
                        },
                      }}
                      render={({ field }) => (
                        <Form.Control
                          autoFocus
                          isInvalid={!!_.has(errors, 'email')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {_.has(errors, 'email') ? errors.email.message : 'Invalid email.'}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                      variant="secondary"
                      type="submit"
                      disabled={loading}
                      size="lg"
                    >
                      <FontAwesomeIcon icon={solid('gear')} />
                      {' '}
                      {loading ? 'Loading…' : 'Reset'}
                    </Button>
                  </div>
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
        </div>
      </div>
    </PageContext.Provider>
  );
}

function SuccessConfirmModal() {
  const { success, email } = useContext(PageContext);
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
        <Modal.Title>Email sent!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="success">
          <Alert.Heading>
            <FontAwesomeIcon icon={solid('thumbs-up')} />
            {' '}
            Great!
          </Alert.Heading>
          <p>
            We have sent a link into your email
            {' '}
            {`"${email}"`}
          </p>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onConfirm}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
