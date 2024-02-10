import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import _ from 'lodash'
import { DashboardTemplate } from '../../../../template/components'
import { GET_SCHOOL_USERS } from '../gql'
import { LoginContext } from '../../../login'
import UsersContext from '../sections.context'
import { useLocation } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import styledComponents from 'styled-components'
import SectionStudents from '../sectionStudents'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

const SubTitle = styledComponents.span`
  font-size: 16px;
  color: #757575;
`

export default function Index() {
  const { userId } = useContext(LoginContext)
  const [users, setUsers] = useState([])
  const location = useLocation()

  const {
    state: { subjectName, sectionName, sectionId, subjectId }
  } = location

  const { data, loading } = useQuery(GET_SCHOOL_USERS, {
    skip: !userId,
    variables: {
      roleCodes: ['STUDENT']
    },
    pollInterval: 5000
  })

  useEffect(() => {
    const users = _.has(data, 'getAllUsers') ? data.getAllUsers : []

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
    <DashboardTemplate>
      <UsersContext.Provider value={contextPayload}>
        <StyledRow>
          <Col>
            <Card>
              <Card.Header>
                <h3 className='pb-3'>
                  {sectionName} <SubTitle>{subjectName}</SubTitle>
                </h3>
              </Card.Header>
              <Card.Body>
                <SectionStudents />
              </Card.Body>
            </Card>
          </Col>
        </StyledRow>
      </UsersContext.Provider>
    </DashboardTemplate>
  )
}
