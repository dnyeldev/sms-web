import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import _ from 'lodash'
import { Controller } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
// import { SelectInterest } from '.';
import { GRADE_LEVELS } from '../constants'

export default function Index(payload) {
  const { control, formState, setValue, avatar } = payload
  const { errors } = formState

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

  return (
    <div className='row form-row'>
      <Row className='mb-3'>
        <Form.Group as={Col} sm={12} controlId='reg.file'>
          <Controller
            name='file'
            control={control}
            render={() => (
              <div className='change-avatar'>
                <div className='profile-img'>
                  {avatar ? (
                    <img src={avatar} alt='User' />
                  ) : (
                    <FontAwesomeIcon
                      icon={regular('id-badge')}
                      size='5x'
                      style={{ color: '#fe9445' }}
                    />
                  )}
                </div>
                <div className='upload-img'>
                  <div className='change-photo-btn'>
                    <span>
                      <i className='fa fa-upload' /> Upload Photo
                    </span>
                    <input
                      type='file'
                      className='upload'
                      onChange={(e) => {
                        const fileList = e.target.files

                        setValue('file', fileList[0])
                      }}
                      multiple
                    />
                  </div>
                  <small className='form-text text-muted'>
                    Allowed JPG, GIF or PNG. Max size of 2MB
                  </small>
                </div>
              </div>
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {_.has(errors, 'file') ? errors.file.message : 'Invalid file.'}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className='mb-3'>
        <Form.Group as={Col} sm={6} controlId='reg.mobile'>
          <Form.Label>Mobile</Form.Label>
          <Controller
            name='mobile'
            control={control}
            rules={{
              required: 'Field is required.',
              validate: validateMobile
            }}
            render={({ field }) => (
              <Form.Control isInvalid={!!_.has(errors, 'mobile')} {...field} />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {_.has(errors, 'mobile')
              ? errors.mobile.message
              : 'Invalid mobile.'}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} sm={6} controlId='reg.gradeLevel'>
          <Form.Label>Grade Level</Form.Label>
          <Controller
            name='gradeLevel'
            control={control}
            rules={{ required: 'Field is required.' }}
            render={({ field }) => (
              <Form.Select isInvalid={!!_.has(errors, 'gradeLevel')} {...field}>
                <option value={undefined}>Select grade level</option>
                {GRADE_LEVELS.map((i) => (
                  <option value={i.code}>{i.label}</option>
                ))}
              </Form.Select>
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {_.has(errors, 'gradeLevel')
              ? errors.gradeLevel.message
              : 'Invalid grade level.'}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      {/* <Row className="mb-3">
        <Col sm={6}>
          <SelectInterest {...payload} />
        </Col>
      </Row> */}

      <Row className='mb-3'>
        <Form.Group as={Col} sm={6} controlId='reg.address1'>
          <Form.Label>
            Address <span className='text-muted'>(Unit, House #, Street)</span>
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
            Address 2 <span className='text-muted'>(Brgy, District, Subd)</span>
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
              <Form.Control isInvalid={!!_.has(errors, 'city')} {...field} />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {_.has(errors, 'city') ? errors.city.message : 'Invalid city.'}
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
              required: { value: true, message: 'Field is required.' },
              maxLength: { value: 2, message: 'Maximum of 2 characters only' }
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
    </div>
  )
}
