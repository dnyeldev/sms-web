import React, { useCallback, useContext, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import _ from 'lodash'
import { LoginPageContext } from './login.context';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
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

export default ({ error: authError }) => {
  const { loading, onSubmit } = useContext(LoginPageContext)
  const { handleSubmit, formState, control } = useForm()
  const { errors } = formState
  const navigate = useNavigate()
  const [passwordType, setPasswordType] = useState('password')

  const submitForm = useCallback((data) => {
    onSubmit(data)
  })

  const toForgot = useCallback(() => {
    navigate('/forgot')
  })

  const togglePasswordType = useCallback(() => {
    const type = passwordType === 'password' ? 'text' : 'password'

    setPasswordType(type)
  }, [passwordType])

  return (
    <div className="bg-pattern-style">
      <div className="content">
        <div className="account-content">
          <div className="account-box">
            <div className="login-right">
              <div className="login-header">
                <h3><FontAwesomeIcon icon={regular('user')} /> Login <span>USER</span></h3>
                <p className="text-muted">Access the dashboard</p>
              </div>
              <Form noValidate onSubmit={handleSubmit(submitForm)}>
                <Form.Group className="form-group" controlId="login.username" >
                  <Form.Label>Username</Form.Label>
                  <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'Username is required.' }}
                    render={({ field }) => (
                      <Form.Control
                        autoFocus
                        isInvalid={_.has(errors, 'username') ? true : false}
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
                    icon={<FontAwesomeIcon
                      className={passwordType === 'text' ? 'active' : ''}
                      icon={regular('eye')}
                      onClick={togglePasswordType}
                    />}
                    render={({ field }) => (
                      <Form.Control
                        autoFocus
                        type={passwordType}
                        isInvalid={_.has(errors, 'password') ? true : false}
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
                  <Button variant="link" onClick={toForgot}>Forgot Password?</Button>
                </div>

                {authError && <AlertDismissible />}

                <div className="d-grid gap-2">
                  <Button
                    variant='secondary'
                    type="submit"
                    disabled={loading}
                    size="lg"
                  >
                    <FontAwesomeIcon icon={solid('right-to-bracket')} />
                    {' '}
                    {loading ? 'Loading…' : 'Login'}
                  </Button>
                </div>

                <div className="text-center dont-have">Don’t have an account? <a href="/register">Register</a></div>
              </Form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

function AlertDismissible() {
  const { error, setError } = useContext(LoginPageContext)

  const onClose = useCallback(() => {
    setError(null)
  })

  return (
    <Alert variant="danger" onClose={onClose} dismissible>
      <Alert.Heading>Login Error!</Alert.Heading>
      <p>{error}</p>
    </Alert>
  );
}