import React, { useEffect, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import _ from 'lodash'
import { gql } from 'apollo-boost'
import { Controller } from 'react-hook-form'
import { useQuery } from '@apollo/client'

const getSubjectsQuery = gql`
  query getSubjects($gradeLevel: GradeLevels) {
    getSubjects(gradeLevel: $gradeLevel) {
      id
      name
      __typename
    }
  }
`

export default function Index(payload) {
  const {
    control,
    formState,
    label = 'Subject',
    watch,
    setValue,
    placeholder,
    disabled,
    gradeLevel,
    ...etc
  } = payload
  const { errors } = formState
  const [subjects, setSubjects] = useState([])

  const watchInput = watch('subjectId')

  const { data } = useQuery(getSubjectsQuery, {
    variables: { gradeLevel }
  })

  useEffect(() => {
    if (
      watchInput === 'Select Subject' ||
      watchInput === 'invalid' ||
      watchInput === placeholder
    ) {
      setValue('subjectId', undefined)
    }
  }, [watchInput])

  useEffect(() => {
    const getSubjects = _.has(data, 'getSubjects') ? data.getSubjects : []

    setSubjects(getSubjects)
  }, [data])

  return (
    <Form.Group as={Col} sm={12} controlId='subjectId'>
      <Form.Label>{label}</Form.Label>
      <Controller
        name='subjectId'
        control={control}
        rules={{ required: 'Subject is required.' }}
        render={({ field }) => (
          <Form.Select
            isInvalid={!!_.has(errors, 'subjectId')}
            {...field}
            disabled={disabled}
          >
            <option value='invalid'>Select Subject</option>
            {subjects.map((subject, key) => (
              <option key={`sub-key-${key}`} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </Form.Select>
        )}
      />
      <p className='text-danger mt-1' style={{ fontSize: '.875em' }}>
        {_.has(errors, 'subjectId') ? errors.subjectId.message : ''}
      </p>
    </Form.Group>
  )
}
