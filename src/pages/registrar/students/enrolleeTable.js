/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Card, Col, Row } from 'react-bootstrap'
import CustomTable from '../../../components/table'
import UsersContext from './page.context'
import styledComponents from 'styled-components'
import LrnModal from './lrnModal'
import ViewModal from './viewEnrollmentModal'
import AddPaymentModal from './addPaymentModal'

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`

export default function Index({ title = 'Students', headers = null }) {
  const { users, loading } = useContext(UsersContext)

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
      title: 'Section',
      dataKey: 'sectionStudent',
      render: (sectionStudent) => {
        const section = _.has(sectionStudent, 'section')
          ? sectionStudent.section
          : null
        const name = _.has(section, 'name') ? section.name : null

        return name
      }
    },
    {
      title: 'Grade Level',
      dataKey: 'gradeLevel'
    },
    {
      title: 'Date Enrolled',
      dataKey: 'createdAt',
      center: true,
      render: (createdAt) => {
        return moment(createdAt).format('lll')
      }
    },
    {
      title: '',
      dataKey: 'userId',
      center: true,
      render: (userId, row) => {
        const enrolleeId = _.has(row, 'id') ? parseInt(row.id) : null

        return (
          <>
            <LrnModal userId={userId} />
            <ViewModal enrolleeId={enrolleeId} />
            <AddPaymentModal enrolleeId={enrolleeId} />
          </>
        )
      }
    }
  ])

  return (
    <>
      <h3 className='pb-3'>{title}</h3>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header>{headers}</Card.Header>
            <Card.Body>
              <CustomTable
                columns={columns}
                dataValues={users}
                loading={loading}
              />
            </Card.Body>
          </Card>
        </Col>
      </StyledRow>
    </>
  )
}
