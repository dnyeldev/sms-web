/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Promise from 'bluebird'
import _ from 'lodash'
import { Card, Col, Row } from 'react-bootstrap'
import { CustomTable } from '../../../components'
import styledComponents from 'styled-components'
import SectionContext from './sections.context'
import { GET_ENROLLEE, GET_SECTION_STUDENTS } from './gql'
import client from '../../../CoreClient'
import { useQuery } from '@apollo/client'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

const getStudent = ({ enrolleeId }) => {
  return new Promise((resolve, reject) => {
    async function init() {
      const result = await client.query({
        query: GET_ENROLLEE,
        variables: { enrolleeId }
      })

      const data = _.has(result, 'data') ? result.data : null
      const enrollee = _.has(data, 'getEnrollee') ? data.getEnrollee : null
      const student = _.has(enrollee, 'student') ? enrollee.student : null

      return student
    }

    try {
      resolve(init())
    } catch (err) {
      reject(err)
    }
  })
}

export default function Index() {
  const { sectionId, schoolYearId } = useContext(SectionContext)
  const [students, setStudents] = useState([])

  const { data, loading } = useQuery(GET_SECTION_STUDENTS, {
    skip: !sectionId || !schoolYearId,
    variables: {
      sectionId: parseInt(sectionId),
      schoolYearId: parseInt(schoolYearId)
    }
  })

  useEffect(() => {
    const iStudents = _.has(data, 'getSectionStudents')
      ? data.getSectionStudents
      : []

    setStudents(iStudents)
  }, [data])

  const columns = useMemo(() => [
    {
      title: 'LRN #',
      dataKey: 'student',
      render: (student) => {
        const profile = _.has(student, 'profile') ? student.profile : null
        const lrn = _.has(profile, 'lrnNo') ? profile.lrnNo : null

        return lrn || ''
      }
    },
    {
      title: 'Name',
      dataKey: 'student',
      render: (student) => {
        const profile = _.has(student, 'profile') ? student.profile : null
        const firstName = _.has(profile, 'firstName') ? profile.firstName : null
        const lastName = _.has(profile, 'lastName') ? profile.lastName : null
        const fullName = `${firstName} ${lastName}`

        return fullName
      }
    },
    {
      title: 'Gender',
      dataKey: 'student',
      render: (student) => {
        const profile = _.has(student, 'profile') ? student.profile : null
        const gender = _.has(profile, 'gender') ? profile.gender : null

        return gender || ''
      }
    },
    {
      title: 'STATUS',
      dataKey: 'student',
      render: (student) => {
        const status = _.has(student, 'status') ? student.status : null

        return status
      }
    }
  ])

  return (
    <>
      <h4 className='pb-3'>Students</h4>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <CustomTable
                columns={columns}
                dataValues={students}
                loading={loading}
              />
            </Card.Body>
          </Card>
        </Col>
      </StyledRow>
    </>
  )
}
