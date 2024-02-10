import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Card, Row, ListGroup } from 'react-bootstrap'
import { GET_USERS } from './gql'
import _ from 'lodash'
import { LoadingSpinner } from '../../../components'

export default function count() {
  const [students, setStudents] = useState(0)
  const [teachers, setTeachers] = useState(0)

  const { data, loading } = useQuery(GET_USERS, {
    variables: { roleCodes: ['STUDENT', 'TEACHER'], status: 'ACTIVE' }
  })

  useEffect(() => {
    const records = _.has(data, 'getAllUsers') ? data.getAllUsers : []

    const iStudent = _.filter(records, (i) => i.roleCode === 'STUDENT')
    const iTeacher = _.filter(records, (i) => i.roleCode === 'TEACHER')

    setStudents(iStudent.length)
    setTeachers(iTeacher.length)
  }, [data])

  return (
    <Card>
      <Card.Body>
        <Row>
          <ListGroup as='ul'>
            <ListGroup.Item
              as='li'
              className='d-flex justify-content-between align-items-start'
            >
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Students:</div>
                <div>{loading ? <LoadingSpinner /> : students}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              as='li'
              className='d-flex justify-content-between align-items-start'
            >
              <div className='ms-2 me-auto'>
                <div className='fw-bold'>Teachers:</div>
                <div>{loading ? <LoadingSpinner /> : teachers}</div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Row>
      </Card.Body>
    </Card>
  )
}
