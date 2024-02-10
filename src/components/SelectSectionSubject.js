import React, { useEffect, useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import _ from 'lodash'
import { gql } from 'apollo-boost'
import { Controller } from 'react-hook-form'
import { useQuery } from '@apollo/client'

const getSectionSubjects = gql`
  query getSectionSubjects($sectionId: Int!, $schoolYearId: Int!) {
    getSectionSubjects(sectionId: $sectionId, schoolYearId: $schoolYearId) {
      id
      subject {
        id
        name
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
    label = 'Subject',
    watch,
    setValue,
    placeholder,
    disabled,
    sectionId,
    schoolYearId,
    ...etc
  } = payload
  const { errors } = formState
  const [subjects, setSubjects] = useState([])

  const watchInput = watch('sectionSubjectId')

  const { data } = useQuery(getSectionSubjects, {
    variables: { sectionId, schoolYearId }
  })

  useEffect(() => {
    if (
      watchInput === 'Select Subject' ||
      watchInput === 'invalid' ||
      watchInput === placeholder
    ) {
      setValue('sectionSubjectId', undefined)
    } else {
      setValue('sectionSubjectId', parseInt(watchInput))
    }
  }, [watchInput])

  useEffect(() => {
    const result = _.has(data, 'getSectionSubjects')
      ? data.getSectionSubjects
      : []

    const mapSubjects = _.map(result, (ss) => {
      const subject = _.has(ss, 'subject') ? ss.subject : null
      const id = _.has(ss, 'id') ? ss.id : null
      const name = _.has(subject, 'name') ? subject.name : null

      return { id, name }
    })

    setSubjects(mapSubjects)
  }, [data])

  return (
    <Form.Group as={Col} sm={12} controlId='sectionSubjectId'>
      <Form.Label>{label}</Form.Label>
      <Controller
        name='sectionSubjectId'
        control={control}
        rules={{ required: 'Subject is required.' }}
        render={({ field }) => (
          <Form.Select
            isInvalid={!!_.has(errors, 'sectionSubjectId')}
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
        {_.has(errors, 'sectionSubjectId')
          ? errors.sectionSubjectId.message
          : ''}
      </p>
    </Form.Group>
  )
}
