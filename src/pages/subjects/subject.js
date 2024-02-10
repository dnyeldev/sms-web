import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { DashboardTemplate } from '../../template/components'
import SubjectsContext from './subjects.context'
import styledComponents from 'styled-components'
import { Card, Col, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { GET_SUBJECT } from './gql'
import { useQuery } from '@apollo/client'
import SubjectTeachersTable from './subjectTeachersTable'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

export default function Index() {
  // const { userId } = useContext(LoginContext)
  const location = useLocation()
  const {
    state: { subjectId }
  } = location

  const [subject, setSubject] = useState(null)
  const [subjectName, setSubjectName] = useState(null)

  const { data, loading } = useQuery(GET_SUBJECT, {
    variables: { id: subjectId }
  })

  useEffect(() => {
    const getSubject = _.has(data, 'getSubject') ? data.getSubject : null
    const name = _.has(getSubject, 'name') ? getSubject.name : null

    setSubjectName(name)
  }, [data])

  const contextPayload = useMemo(
    () => ({
      subjectId
    }),
    [subjectId]
  )

  return (
    <DashboardTemplate>
      <SubjectsContext.Provider value={contextPayload}>
        <h3 className='pb-3'>Subject</h3>
        <StyledRow>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title>{subjectName}</Card.Title>
              </Card.Header>
              <Card.Body>
                <SubjectTeachersTable />
              </Card.Body>
            </Card>
          </Col>
        </StyledRow>
      </SubjectsContext.Provider>
    </DashboardTemplate>
  )
}
