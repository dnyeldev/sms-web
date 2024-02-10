/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Card, Col, Row, Button } from 'react-bootstrap'
import { CustomTable } from '../../../components'
import styledComponents from 'styled-components'
import SectionContext from './sections.context'
import { GET_SECTION_STUDENTS } from './gql'
import { useQuery } from '@apollo/client'
import ViewStudentModal from './viewStudentModal'
import EditGradesModal from './editGradesModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import SelectSectionSubject from '../../../components/SelectSectionSubject'
import { useForm } from 'react-hook-form'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

export default function Index() {
  const { sectionId, schoolYearId, setSectionSubjectId } = useContext(
    SectionContext
  )
  const [students, setStudents] = useState([])
  const formInstant = useForm()
  const { watch } = formInstant

  const sectionSubjectId = watch('sectionSubjectId')

  useEffect(() => {
    setSectionSubjectId(sectionSubjectId)
  }, [setSectionSubjectId, sectionSubjectId])

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

    setStudents(iStudents)
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

        return <ViewStudentModal userId={userId}>{fullName}</ViewStudentModal>
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
    },
    {
      title: '',
      dataKey: 'quarterlyGrades',
      render: (quarterlyGrades, row) => {
        if (!sectionSubjectId) return ''

        const enrolleeId = _.has(row, 'enrolleeId') ? row.enrolleeId : null
        const search = _.find(quarterlyGrades, (grade) => {
          return grade.sectionSubjectId === parseInt(sectionSubjectId)
        })

        const quarterlyId = _.has(search, 'id') ? search.id : null

        return (
          <EditGradesModal enrolleeId={enrolleeId} quarterlyId={quarterlyId}>
            <FontAwesomeIcon icon={solid('file-pen')} />
          </EditGradesModal>
        )
      }
    }
  ])

  return (
    <>
      <h4 className='pb-3'>Students</h4>
      <StyledRow>
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
      </StyledRow>
    </>
  )
}
