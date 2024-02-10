import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import _ from 'lodash'
import { DashboardTemplate } from '../../../template/components'
import { GET_ENROLLEES_QUERY } from './gql'
import { LoginContext } from '../../login'
import StudentsContext from './page.context'
import StudentsTable from './enrolleeTable'
import { Col, Row } from 'react-bootstrap'
import EnrollmentModal from './enrollmentModal'

export default function Index() {
  const { userId } = useContext(LoginContext)
  const [users, setUsers] = useState([])

  const { data, loading } = useQuery(GET_ENROLLEES_QUERY, {
    skip: !userId,
    pollInterval: 5000
  })

  useEffect(() => {
    const users = _.has(data, 'getEnrollees') ? data.getEnrollees : []

    setUsers(users)
  }, [data])

  const contextPayload = useMemo(
    () => ({
      users,
      loading
    }),
    [users, loading]
  )

  return (
    <DashboardTemplate title='Enrollments'>
      <h2 className='pb-3'>Enrollments</h2>
      <Row>
        <Col className='mb-3'>
          <EnrollmentModal />
        </Col>
      </Row>

      <Row>
        <Col>
          <StudentsContext.Provider value={contextPayload}>
            <StudentsTable title='Enrollees' />
          </StudentsContext.Provider>
        </Col>
      </Row>
    </DashboardTemplate>
  )
}
