/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Card, Col, Row } from 'react-bootstrap'
import { CustomTable } from '../../../components'
import SubjectsContext from './subjects.context'
import styledComponents from 'styled-components'
import { GET_SECTION_SUBJECTS } from './gql'
import { useQuery } from '@apollo/client'
import moment from 'moment'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

export default function Index() {
  const { sectionId, schoolYearId } = useContext(SubjectsContext)

  const [subjects, setSubjects] = useState([])

  const { data, loading } = useQuery(GET_SECTION_SUBJECTS, {
    skip: !sectionId || !schoolYearId,
    variables: {
      sectionId,
      schoolYearId
    }
  })

  useEffect(() => {
    const sectionSubjects = _.has(data, 'getSectionSubjects')
      ? data.getSectionSubjects
      : []

    setSubjects(sectionSubjects)
  }, [data])

  const columns = useMemo(() => [
    {
      title: 'Subject',
      dataKey: 'subject',
      render: (subject, row) => {
        const subjectName = _.has(subject, 'name') ? subject.name : null

        return subjectName
      }
    },
    {
      title: 'Teacher',
      dataKey: 'teacher',
      render: (teacher) => {
        const profile = _.has(teacher, 'profile') ? teacher.profile : null
        const firstName = _.has(profile, 'firstName') ? profile.firstName : null
        const lastName = _.has(profile, 'lastName') ? profile.lastName : null

        return `${firstName} ${lastName}`
      }
    },
    {
      title: 'Date Created',
      dataKey: 'createdAt',
      center: true,
      render: (val) => {
        return val ? moment(val).format('lll') : ''
      }
    }
  ])

  return (
    <>
      <h4 className='pb-3'>Subjects</h4>
      <StyledRow>
        <Col>
          <Card>
            {/* <Card.Header></Card.Header> */}
            <Card.Body>
              <CustomTable
                columns={columns}
                dataValues={subjects}
                loading={loading}
              />
            </Card.Body>
          </Card>
        </Col>
      </StyledRow>
    </>
  )
}
