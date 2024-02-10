/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import {
  Button, Modal, Form, Alert,
} from 'react-bootstrap';
import _ from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { signInWithCustomToken } from 'firebase/auth';
import { useMutation } from '@apollo/client';
import ls from 'local-storage';
import LoginContext, { LoginPageContext } from './login.context';
import client from '../../RegistryClient';
import coreClient from '../../CoreClient';
import { getUserTuteeDetailsQuery, getUserTutorDetailsQuery, validateUser } from './gql';
import auth from '../../authEmulatorConnect'
import styledComponents from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

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

export default function Index() {
  const [visible, setVisible] = useState(false);

  const {
    handleSubmit, formState, control, reset,
  } = useForm();
  const { errors } = formState;
  const {
    setUserId, setUserUid, setRoleCode, setTokenManager, setInstanceUid,
  } = useContext(LoginContext);
  const [error, setError] = useState(null)
  const [passwordType, setPasswordType] = useState('password')

  const handleClose = () => {
    setVisible(false);
    reset();
  };

  const handleShow = useCallback(() => {
    setVisible(true);
  });

  const getTutorInstance = (payload) => new Promise((resolve, reject) => {
    coreClient.query({
      query: getUserTutorDetailsQuery,
      variables: { ...payload },
    }).then(({ data }) => {
      const tutor = _.has(data, 'getUserTutorDetails') ? data.getUserTutorDetails : null;
      const tutorUid = _.has(tutor, 'uid') ? tutor.uid : null;

      setInstanceUid(tutorUid);
      ls.set('instanceUid', tutorUid);

      resolve(tutor);
    }).catch((err) => reject(err));
  });

  const getTuteeInstance = (payload) => new Promise((resolve, reject) => {
    coreClient.query({
      query: getUserTuteeDetailsQuery,
      variables: { ...payload },
    }).then(({ data }) => {
      const tutee = _.has(data, 'getUserTuteeDetails') ? data.getUserTuteeDetails : null;
      const tuteeUid = _.has(tutee, 'uid') ? tutee.uid : null;

      setInstanceUid(tuteeUid);
      ls.set('instanceUid', tuteeUid);

      resolve(tutee);
    }).catch((err) => reject(err));
  });

  const [login, { loading }] = useMutation(validateUser, {
    client,
    onCompleted: async (result) => {
      const { validateUser: data } = result;
      const { token, user: userDetails } = data;
      const { id, uid, roleCode } = userDetails;
      const variables = { userUid: uid };

      // get instanceUid(tutorUid || TuteeUid)
      if (roleCode === 'TUTOR') {
        await getTutorInstance(variables);
      }

      if (roleCode === 'TUTEE') {
        await getTuteeInstance(variables);
      }

      await signInWithCustomToken(auth, token)
        .then(async (userCredential) => {
          // Signed in
          const { _tokenResponse } = userCredential;
          const tokenManager = { accessToken: token, ..._tokenResponse };

          ls.set('tokenManager', tokenManager);
          ls.set('userId', id);
          ls.set('userUid', uid);
          ls.set('roleCode', roleCode);

          setUserId(id)
          setUserUid(uid);
          setTokenManager(tokenManager);
          setRoleCode(roleCode);

          setError(null);
          setVisible(false);
        })
        .catch((err) => {
          const errorMessage = err.message;
          setError(errorMessage);
        });
    },
    onError: (err) => {
      const { message } = err;
      setError(message || JSON.stringify(err));
    },
  });

  const submitForm = useCallback((payload) => {
    login({ variables: { ...payload } });
  });

  const loginContextPayload = useMemo(() => ({
    error,
    setError,
  }), [error, setError])

  const togglePasswordType = useCallback(() => {
    const type = passwordType === 'password' ? 'text' : 'password'

    setPasswordType(type)
  }, [passwordType])

  return (
    <LoginPageContext.Provider value={loginContextPayload}>
      <Button variant="primary" onClick={handleShow}>Login to proceed</Button>

      <Modal
        show={visible}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Tutee Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="form-group" controlId="login.username">
              <Form.Label>Username</Form.Label>
              <Controller
                name="username"
                control={control}
                rules={{ required: 'Username is required.' }}
                render={({ field }) => (
                  <Form.Control
                    autoFocus
                    isInvalid={!!_.has(errors, 'username')}
                    {...field}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {_.has(errors, 'username') ? errors.username.message : 'Invalid username.'}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="form-group" controlId="loging.password">
              <Form.Label className="form-control-label">Password</Form.Label>
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

            <div className="text-end">
              <a className="forgot-link" href="forgot-password.html">Forgot Password ?</a>
            </div>

            {error && <AlertDismissible />}

            <Button className="btn btn-primary login-btn" type="submit" disabled={loading}>{loading ? 'Loading…' : 'Login'}</Button>

            <div className="text-center dont-have">
              Don’t have an account?
              {' '}
              <a href="/register">Register</a>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </LoginPageContext.Provider>

  );
}

function AlertDismissible() {
  const { error, setError } = useContext(LoginPageContext);

  const onClose = useCallback(() => {
    setError(null);
  });

  return (
    <Alert variant="danger" onClose={onClose} dismissible>
      <Alert.Heading>Login Error!</Alert.Heading>
      <p>{error}</p>
    </Alert>
  );
}
