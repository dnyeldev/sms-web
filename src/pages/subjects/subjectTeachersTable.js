/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Card, Col, Row } from 'react-bootstrap'
import { CustomTable } from '../../components'
import styledComponents from 'styled-components'
import { GET_SUBJECT_TEACHERS } from './gql'
import { useQuery } from '@apollo/client'
import AddSubjectTeacherModal from './addSubjectTeacherModal'
import SubjectContext from './subjects.context'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

export default function Index() {
  const { subjectId } = useContext(SubjectContext)
  const [teachers, setTeachers] = useState([])
  const { data, loading } = useQuery(GET_SUBJECT_TEACHERS, {
    variables: { subjectId }
  })

  useEffect(() => {
    const iTeachers = _.has(data, 'getSubjectTeachers')
      ? data.getSubjectTeachers
      : []

    setTeachers(iTeachers)
  }, [data])

  const columns = useMemo(() => [
    {
      title: 'Teacher',
      dataKey: 'user',
      render: (user) => {
        const profile = _.has(user, 'profile') ? user.profile : null
        const firstName = _.has(profile, 'firstName') ? profile.firstName : null
        const middleName = _.has(profile, 'middleName')
          ? profile.middleName
          : null
        const lastName = _.has(profile, 'lastName') ? profile.lastName : null

        return `${firstName} ${middleName || ''} ${lastName}`
      }
    },
    {
      title: 'Status',
      dataKey: 'user',
      render: (user) => {
        const status = _.has(user, 'status') ? user.status : null

        return status
      }
    }
  ])
  console.log({ subjectId, teachers })
  return (
    <StyledRow>
      <Col>
        <Card>
          <Card.Header>
            <AddSubjectTeacherModal />
          </Card.Header>
          <Card.Body>
            <CustomTable
              columns={columns}
              dataValues={teachers}
              loading={loading}
            />
          </Card.Body>
        </Card>
      </Col>
    </StyledRow>
  )
}
