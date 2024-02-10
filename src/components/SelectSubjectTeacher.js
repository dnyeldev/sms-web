import React, { useEffect, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import _ from 'lodash'
import { gql } from 'apollo-boost'
import { Controller } from 'react-hook-form'
import { useQuery } from '@apollo/client'

const GET_SUBJECT_TEACHERS = gql`
  query SUBJECT_TEACHERS($subjectId: ID!) {
    getSubjectTeachers(subjectId: $subjectId) {
      id
      subjectId
      teacherId
      user {
        id
        username
        status
        profile {
          id
          firstName
          middleName
          lastName
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

export default function Index(payload) {
  const {
    control,
    formState,
    label = 'Teacher',
    watch,
    setValue,
    placeholder,
    disabled,
    subjectId,
    ...etc
  } = payload
  const { errors } = formState
  const [subjectTeachers, setSubjectTeachers] = useState([])

  const watchInput = watch('subjectId')

  const { data } = useQuery(GET_SUBJECT_TEACHERS, {
    variables: { subjectId }
  })

  useEffect(() => {
    if (
      watchInput === 'Select Subject Teacher' ||
      watchInput === 'invalid' ||
      watchInput === placeholder
    ) {
      setValue('subjectId', undefined)
    }
  }, [watchInput])

  useEffect(() => {
    const teachers = _.has(data, 'getSubjectTeachers')
      ? data.getSubjectTeachers
      : []

    setSubjectTeachers(teachers)
  }, [data])

  return (
    <Form.Group as={Col} sm={12} controlId='subjectId'>
      <Form.Label>{label}</Form.Label>
      <Controller
        name='teacherId'
        control={control}
        rules={{ required: 'Teacher is required.' }}
        render={({ field }) => (
          <Form.Select
            isInvalid={!!_.has(errors, 'teacherId')}
            {...field}
            disabled={disabled}
          >
            <option value='invalid'>Select Subject Teacher</option>
            {subjectTeachers.map((subjectTeacher, key) => {
              const userId = _.has(subjectTeacher, 'teacherId')
                ? subjectTeacher.teacherId
                : null
              const user = _.has(subjectTeacher, 'user')
                ? subjectTeacher.user
                : null
              const profile = _.has(user, 'profile') ? user.profile : null

              return (
                <option key={`sub-key-${key}`} value={userId}>
                  {profile.firstName} {profile.lastName}
                </option>
              )
            })}
          </Form.Select>
        )}
      />
      <p className='text-danger mt-1' style={{ fontSize: '.875em' }}>
        {_.has(errors, 'teacherId') ? errors.teacherId.message : ''}
      </p>
    </Form.Group>
  )
}
