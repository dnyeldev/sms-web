import React, { useEffect } from 'react'
import { Col, Form } from 'react-bootstrap'
import _ from 'lodash'
import { Controller } from 'react-hook-form'

export default function Index(payload) {
  const {
    control,
    formState,
    label = 'Upload Files',
    watch,
    setValue,
    placeholder,
    ...etc
  } = payload
  const { errors } = formState

  const watchInput = watch('files')

  useEffect(() => {
    if (watchInput === 'invalid' || watchInput === placeholder) {
      setValue('files', [])
    }
  }, [watchInput])

  return (
    <Form.Group as={Col} sm={12} controlId='files'>
      <Form.Label>{label}</Form.Label>
      <Controller
        name='files[]'
        control={control}
        rules={{ required: 'File is required.' }}
        placeholder
        render={({ field }) => (
          <Form.Control
            isInvalid={!!_.has(errors, 'files')}
            {...field}
            type='file'
            onChange={(e) => {
              const fileList = e.target.files

              setValue('files', fileList)
            }}
            multiple
            placeholder
          />
        )}
      />
      <p className='text-danger mt-1' style={{ fontSize: '.875em' }}>
        {_.has(errors, 'files') ? errors.files.message : ''}
      </p>
    </Form.Group>
  )
}
