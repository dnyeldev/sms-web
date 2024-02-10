/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Card, Col } from 'react-bootstrap'
import { CustomTable } from '../../../components'
import GradesContext from './grades.context'
import { GET_SECTION_STUDENTS } from './gql'
import { useQuery } from '@apollo/client'
import SelectSectionSubject from '../../../components/SelectSectionSubject'
import { useForm } from 'react-hook-form'

import AppContext from '../../app/app.context'

export default function Index() {
  const { sectionId, schoolYearId } = useContext(GradesContext)
  const [students, setStudents] = useState([])
  const formInstant = useForm()
  const { watch } = formInstant
  const { enrollmentId } = useContext(AppContext)

  const sectionSubjectId = watch('sectionSubjectId')

  const { data, loading } = useQuery(GET_SECTION_STUDENTS, {
    skip: !sectionId || !schoolYearId,
    variables: {
      sectionId,
      schoolYearId
    }
  })

  useEffect(() => {
    const iStudents = _.has(data, 'getSectionStudents')
      ? data.getSectionStudents
      : []

    const filtered = _.filter(iStudents, (student) => {
      const enrolleeId = _.has(student, 'enrolleeId')
        ? student.enrolleeId
        : null

      return enrolleeId === enrollmentId
    })

    setStudents(filtered)
  }, [data])

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataKey: 'student',
      render: (student) => {
        const userId = _.has(student, 'id') ? student.id : null
        const profile = _.has(student, 'profile') ? student.profile : null
        const firstName = _.has(profile, 'firstName') ? profile.firstName : null
        const lastName = _.has(profile, 'lastName') ? profile.lastName : null
        const fullName = `${firstName} ${lastName}`

        return fullName
      }
    },
    {
      title: 'Q1',
      dataKey: 'quarterlyGrades',
      center: true,
      render: (quarterlyGrades) => {
        if (!sectionSubjectId) return ''

        const search = _.find(quarterlyGrades, (grade) => {
          const iSectionSubjectId = _.has(grade, 'sectionSubjectId')
            ? grade.sectionSubjectId
            : null

          return grade.sectionSubjectId === parseInt(sectionSubjectId)
        })
        const q1 = _.has(search, 'q1') ? search.q1 : ''

        return q1 | ''
      }
    },
    {
      title: 'Q2',
      dataKey: 'quarterlyGrades',
      center: true,
      render: (quarterlyGrades) => {
        if (!sectionSubjectId) return ''

        const search = _.find(quarterlyGrades, (grade) => {
          return grade.sectionSubjectId === parseInt(sectionSubjectId)
        })
        const q2 = _.has(search, 'q2') ? search.q2 : ''

        return q2 || ''
      }
    },
    {
      title: 'Q3',
      dataKey: 'quarterlyGrades',
      center: true,
      render: (quarterlyGrades) => {
        if (!sectionSubjectId) return ''

        const search = _.find(quarterlyGrades, (grade) => {
          return grade.sectionSubjectId === parseInt(sectionSubjectId)
        })
        const q3 = _.has(search, 'q3') ? search.q3 : null

        return q3 || ''
      }
    },
    {
      title: 'Q4',
      dataKey: 'quarterlyGrades',
      center: true,
      render: (quarterlyGrades) => {
        if (!sectionSubjectId) return ''

        const search = _.find(quarterlyGrades, (grade) => {
          return grade.sectionSubjectId === parseInt(sectionSubjectId)
        })
        const q4 = _.has(search, 'q4') ? search.q4 : null

        return q4 || ''
      }
    },
    {
      title: 'Final',
      dataKey: 'quarterlyGrades',
      center: true,
      render: (quarterlyGrades) => {
        if (!sectionSubjectId) return ''

        const search = _.find(quarterlyGrades, (grade) => {
          return grade.sectionSubjectId === parseInt(sectionSubjectId)
        })

        let q1 = _.has(search, 'q1') ? search.q1 : 0
        let q2 = _.has(search, 'q2') ? search.q2 : 0
        let q3 = _.has(search, 'q3') ? search.q3 : 0
        let q4 = _.has(search, 'q4') ? search.q4 : 0

        const total = (q1 + q2 + q3 + q4) / 4

        return total || ''
      }
    },
    {
      title: 'Verdict',
      dataKey: 'quarterlyGrades',
      render: (quarterlyGrades, row) => {
        if (!sectionSubjectId) return ''

        const search = _.find(quarterlyGrades, (grade) => {
          return grade.sectionSubjectId === parseInt(sectionSubjectId)
        })

        const verdict = _.has(search, 'verdict') ? search.verdict : null

        return verdict || ''
      }
    }
  ])

  return (
    <Col>
      <Card>
        <Card.Header>
          <SelectSectionSubject
            sectionId={sectionId}
            schoolYearId={schoolYearId}
            {...formInstant}
          />
        </Card.Header>
        <Card.Body>
          <CustomTable
            columns={columns}
            dataValues={students}
            loading={loading}
          />
        </Card.Body>
      </Card>
    </Col>
  )
}
