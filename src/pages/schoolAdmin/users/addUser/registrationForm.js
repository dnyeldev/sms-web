import React, { useCallback, useContext, useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import _ from 'lodash'
import ReactDatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import RegistrationContext from './registration.context'
import { AlertError } from '../../../../components'
import styledComponents from 'styled-components'
import { useNavigate } from 'react-router-dom'

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
  const { onSubmit, loading, error, setError } = useContext(RegistrationContext)
  const formInstant = useForm()
  const { handleSubmit, formState, control, getValues, setValue } = formInstant
  const { errors } = formState
  const [passwordType, setPasswordType] = useState('password')
  const [confPasswordType, setConfPasswordType] = useState('password')
  const navigate = useNavigate()

  const togglePasswordType = useCallback(() => {
    const type = passwordType === 'password' ? 'text' : 'password'

    setPasswordType(type)
  }, [passwordType])

  const toggleConfPasswordType = useCallback(() => {
    const type = confPasswordType === 'password' ? 'text' : 'password'

    setConfPasswordType(type)
  }, [confPasswordType])

  const submitForm = useCallback((data) => {
    onSubmit(data)
  })

  const validateMobile = (value) => {
    var reg = /^\d+$/
    const valid = reg.test(value)
    const length = value.length

    if (length !== 12) {
      return 'Mobile number should be in 12 digits format 63995xxxxxxx'
    }

    if (!valid) {
      return 'Invalid numbers'
    }

    return true
  }

  const validateEmail = (value) => {
    var reg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const valid = reg.test(value)

    if (!valid) {
      return 'Invalid email format'
    }

    return true
  }

  return (
    <div className='bg-pattern-style bg-pattern-style-register'>
      <div className='content'>
        <div className='account-content'>
          <div className='account-box'>
            <div className='login-right'>
              <div className='login-header'>
                <h3>
                  <FontAwesomeIcon icon={regular('user')} /> <span>User</span>{' '}
                  Registration
                </h3>
                <p className='text-muted'>Create system user</p>
              </div>

              <Form noValidate onSubmit={handleSubmit(submitForm)}>
                <Row className='mb-3'>
                  <Form.Group as={Col} sm={12} controlId='select.role'>
                    <Form.Label>User Role</Form.Label>
                    <Controller
                      name='roleCode'
                      control={control}
                      rules={{ required: 'Field is required.' }}
                      render={({ field }) => (
                        <Form.Select
                          isInvalid={!!_.has(errors, 'roleCode')}
                          {...field}
                        >
                          <option value={undefined}>Select Role</option>
                          <option value='TEACHER'>Teacher</option>
                          <option value='REGISTRAR'>Registrar</option>
                          <option value='SCHOOL_ADMIN'>School Admin</option>
                        </Form.Select>
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'roleCode')
                        ? errors.roleCode.message
                        : 'Invalid role code.'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row>
                  <Col lg={5}>
                    <Form.Group
                      className='form-group'
                      controlId='registerTutor.firstName'
                    >
                      <Form.Label>First Name</Form.Label>
                      <Controller
                        name='firstName'
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
                      <Form.Control.Feedback type='invalid'>
                        {_.has(errors, 'firstName')
                          ? errors.firstName.message
                          : 'Invalid first name.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={2}>
                    <Form.Group
                      className='form-group'
                      controlId='registerTutor.middleName'
                    >
                      <Form.Label>Middle</Form.Label>
                      <Controller
                        name='middleName'
                        control={control}
                        render={({ field }) => (
                          <Form.Control
                            autoFocus
                            isInvalid={!!_.has(errors, 'middleName')}
                            {...field}
                          />
                        )}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {_.has(errors, 'middleName')
                          ? errors.middleName.message
                          : 'Invalid middle name.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={5}>
                    <Form.Group
                      className='form-group'
                      controlId='registerTutor.lastName'
                    >
                      <Form.Label className='form-control-label'>
                        Last Name
                      </Form.Label>
                      <Controller
                        name='lastName'
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
                      <Form.Control.Feedback type='invalid'>
                        {_.has(errors, 'lastName')
                          ? errors.lastName.message
                          : 'Invalid last name.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='mb-3'>
                  <Form.Group as={Col} sm={12} controlId='reg.mobile'>
                    <Form.Label>Mobile</Form.Label>
                    <Controller
                      name='mobile'
                      control={control}
                      rules={{
                        required: 'Field is required.',
                        validate: validateMobile
                      }}
                      render={({ field }) => (
                        <Form.Control
                          placeholder='639xxxxxxxxx'
                          isInvalid={!!_.has(errors, 'mobile')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'mobile')
                        ? errors.mobile.message
                        : 'Invalid mobile.'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-3'>
                  <Form.Group as={Col} sm={6} controlId='reg.birthDay'>
                    <Form.Label>Date of Birth</Form.Label>
                    <Controller
                      name='birthDay'
                      control={control}
                      rules={{ required: 'Birth date is required.' }}
                      render={({ field }) => (
                        <DatePicker
                          isInvalid={!!_.has(errors, 'birthDay')}
                          {...field}
                        />
                      )}
                    />
                    <p
                      className='text-danger mt-1'
                      style={{ fontSize: '.875em' }}
                    >
                      {_.has(errors, 'birthDay') ? errors.birthDay.message : ''}
                    </p>
                  </Form.Group>

                  <Form.Group as={Col} sm={6} controlId='reg.gender'>
                    <Form.Label>Gender</Form.Label>
                    <Controller
                      name='gender'
                      control={control}
                      rules={{ required: 'Field is required.' }}
                      render={({ field }) => (
                        <Form.Select
                          isInvalid={!!_.has(errors, 'gender')}
                          {...field}
                        >
                          <option value={undefined}>Select Gender</option>
                          <option value='MALE'>Male</option>
                          <option value='FEMALE'>Female</option>
                        </Form.Select>
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'gender')
                        ? errors.gender.message
                        : 'Invalid gender.'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-3'>
                  <Form.Group as={Col} sm={6} controlId='reg.address1'>
                    <Form.Label>
                      Address{' '}
                      <span className='text-muted'>
                        (Unit, House #, Street)
                      </span>
                    </Form.Label>
                    <Controller
                      name='address1'
                      control={control}
                      rules={{ required: 'Field is required.' }}
                      render={({ field }) => (
                        <Form.Control
                          isInvalid={!!_.has(errors, 'address1')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'address1')
                        ? errors.address1.message
                        : 'Invalid address.'}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} sm={6} controlId='reg.adress2'>
                    <Form.Label>
                      Address 2{' '}
                      <span className='text-muted'>(Brgy, District, Subd)</span>
                    </Form.Label>
                    <Controller
                      name='address2'
                      control={control}
                      rules={{ required: 'Field is required.' }}
                      render={({ field }) => (
                        <Form.Control
                          isInvalid={!!_.has(errors, 'address2')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'address2')
                        ? errors.address2.message
                        : 'Invalid address 2.'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-3'>
                  <Form.Group as={Col} sm={6} controlId='reg.city'>
                    <Form.Label>City</Form.Label>
                    <Controller
                      name='city'
                      control={control}
                      rules={{ required: 'Field is required.' }}
                      render={({ field }) => (
                        <Form.Control
                          isInvalid={!!_.has(errors, 'city')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'city')
                        ? errors.city.message
                        : 'Invalid city.'}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} sm={3} controlId='reg.postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Controller
                      name='postalCode'
                      control={control}
                      rules={{ required: 'Field is required.' }}
                      render={({ field }) => (
                        <Form.Control
                          isInvalid={!!_.has(errors, 'postalCode')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'postalCode')
                        ? errors.postalCode.message
                        : 'Invalid postal code.'}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} sm={3} controlId='reg.countryCode'>
                    <Form.Label>Country Code</Form.Label>
                    <Controller
                      name='countryCode'
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'Field is required.'
                        },
                        maxLength: {
                          value: 2,
                          message: 'Maximum of 2 characters only'
                        }
                      }}
                      render={({ field }) => (
                        <Form.Control
                          isInvalid={!!_.has(errors, 'countryCode')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'countryCode')
                        ? errors.countryCode.message
                        : 'Invalid country code.'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <hr />

                <Row className='mb-3'>
                  <Form.Group as={Col} sm={12} controlId='registerTutor.email'>
                    <Form.Label className='form-control-label'>
                      Email Address
                    </Form.Label>
                    <Controller
                      name='email'
                      control={control}
                      rules={{
                        required: 'Email is required.',
                        validate: validateEmail
                      }}
                      autoFocus
                      render={({ field }) => (
                        <Form.Control
                          autoFocus
                          type='email'
                          isInvalid={!!_.has(errors, 'email')}
                          {...field}
                        />
                      )}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {_.has(errors, 'email')
                        ? errors.email.message
                        : 'Invalid email.'}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row>
                  <Col lg='6'>
                    <Form.Group
                      className='form-group'
                      controlId='registerTutor.password'
                    >
                      <Form.Label className='form-control-label'>
                        Password
                      </Form.Label>
                      <Controller
                        name='password'
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
                      <Form.Control.Feedback type='invalid'>
                        {_.has(errors, 'password')
                          ? errors.password.message
                          : 'Invalid password.'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col lg='6'>
                    <Form.Group
                      className='form-group'
                      controlId='registerTutor.confirmPassword'
                    >
                      <Form.Label className='form-control-label'>
                        Confirm Password
                      </Form.Label>
                      <Controller
                        name='confirmPassword'
                        control={control}
                        rules={{
                          required: 'Confirm password is required.',
                          validate: {
                            missMatched: (value) =>
                              value === getValues('password')
                          }
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
                            className={
                              confPasswordType === 'text' ? 'active' : ''
                            }
                            icon={regular('eye')}
                            onClick={toggleConfPasswordType}
                          />
                        </i>
                      </ViewToggle>
                      <Form.Control.Feedback type='invalid'>
                        {_.has(errors, 'confirmPassword')
                          ? errors.confirmPassword.message
                          : 'Invalid confirm password.'}
                        {_.has(errors, 'confirmPassword') &&
                          errors.confirmPassword.type === 'missMatched' &&
                          'Password mismatched'}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    {error && (
                      <AlertError
                        title='Registration Error!'
                        error={error}
                        onClose={() => setError(null)}
                      />
                    )}

                    <div className='d-grid gap-2'>
                      <Button
                        variant='secondary'
                        type='submit'
                        disabled={loading}
                        size='lg'
                      >
                        <FontAwesomeIcon icon={solid('right-to-bracket')} />{' '}
                        {loading ? 'Loading…' : 'Create User Account'}
                      </Button>
                    </div>
                    <div className='account-footer text-center mt-3'>
                      <Button
                        variant='default'
                        disabled={loading}
                        e
                        onClick={() => navigate(-1)}
                      >
                        <FontAwesomeIcon icon={solid('circle-xmark')} />{' '}
                        {loading ? 'Loading…' : 'Cancel'}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CustomInput = React.forwardRef((props, inRef) => (
  <Form.Control ref={inRef} {...props} />
))

const DatePicker = React.forwardRef(({ value, isInvalid, ...etc }, ref) => (
  <ReactDatePicker
    dateFormat='yyyy-MM-dd'
    customInput={<CustomInput isInvalid={isInvalid} />}
    selected={value}
    maxDate={new Date()}
    openToDate={new Date('2010/01/01')}
    {...etc}
  />
))
