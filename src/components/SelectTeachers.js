import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import _ from 'lodash';
import { Controller } from 'react-hook-form';
import { gql, useQuery } from '@apollo/client';

const getAllUsersQuery = gql`
  query getAllUsers($roleCodes: [RoleCodes]) {
      getAllUsers(roleCodes: $roleCodes) {
        id
        roleCode
        status
        username
        profile {
          id
          userId
          firstName
          middleName
          lastName
          gender
          email
          mobile
          lrnNo
          guardian
          userId
          parents
          __typename
        }
        __typename
      }
    }
`;

export default function Index(payload) {
  const {
    control, formState, label = 'Teacher', watch, setValue, placeholder, ...etc
  } = payload;
  const { errors } = formState;
  const [teachers, setTeachers] = useState([])

  const watchInput = watch('teacher');

  const { data, loading } = useQuery(getAllUsersQuery, {
    variables: { roleCodes: ['TEACHER'] }
  })

  useEffect(() => {
    const result = _.has(data, 'getAllUsers') ? data.getAllUsers : []

    setTeachers(result)
  }, [data])

  useEffect(() => {
    if (watchInput === 'invalid' || watchInput === placeholder) {
      setValue('teacherId', undefined);
    }
  }, [watchInput])

  return (
    <Form.Group as={Col} sm={12} controlId="teacher">
      <Form.Label>{label}</Form.Label>
      <Controller
        name="teacherId"
        control={control}
        rules={{ required: 'Teacher is required.' }}
        render={({ field }) => (
          <Form.Select
            isInvalid={!!_.has(errors, 'teacher')}
            {...field}
          >
            <option value="invalid">Select Teacher</option>
            {teachers.map((val, key) => {
              const teacherId = _.has(val, 'id') ? val.id : null
              const profile = _.has(val, 'profile') ? val.profile : null
              const firstName = _.has(profile, 'firstName') ? profile.firstName : null
              const lastName = _.has(profile, 'lastName') ? profile.lastName : null
              const fullName = `${lastName}, ${firstName}`

              return <option key={`teach-key-${key}`} value={teacherId}>{fullName}</option>
            })}
          </Form.Select>
        )
        }
      />
      < p className="text-danger mt-1" style={{ fontSize: '.875em' }}>
        {_.has(errors, 'teacherId') ? errors.teacherId.message : ''}
      </p >
    </Form.Group >
  );
}
