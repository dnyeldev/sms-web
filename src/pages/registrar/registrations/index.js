import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import _ from 'lodash'
import { DashboardTemplate } from '../../../template/components'
import { GET_STUDENTS } from './gql'
import { LoginContext } from '../../login'
import StudentsRegistrationContext from '../../../components/studentsRegistrationTable/page.context'
import StudentsRegistrationTable from '../../../components/studentsRegistrationTable/index'
import StudentsContext from '../../../components/studentsTable/page.context'
import StudentsTable from '../../../components/studentsTable'

export default function Index() {
  const { userId } = useContext(LoginContext)
  const [forApprovals, setForApprovals] = useState([])
  const [students, setStudents] = useState([])

  const { data: forApprovalResult, loading: loadingForApprovals } = useQuery(
    GET_STUDENTS,
    {
      skip: !userId,
      variables: {
        status: ['FOR_APPROVAL']
      },
      pollInterval: 5000
    }
  )

  const { data: studentsResult, loading: loadingStudents } = useQuery(
    GET_STUDENTS,
    {
      skip: !userId,
      variables: {
        status: ['ACTIVE', 'INACTIVE']
      },
      pollInterval: 5000
    }
  )

  useEffect(() => {
    const users = _.has(studentsResult, 'getAllStudents')
      ? studentsResult.getAllStudents
      : []

    setStudents(users)
  }, [studentsResult])

  useEffect(() => {
    const users = _.has(forApprovalResult, 'getAllStudents')
      ? forApprovalResult.getAllStudents
      : []

    setForApprovals(users)
  }, [forApprovalResult])

  const contextPayloadForApprovals = useMemo(
    () => ({
      users: forApprovals,
      loading: loadingForApprovals
    }),
    [forApprovals, loadingForApprovals]
  )

  const contextPayloadStudents = useMemo(
    () => ({
      users: students,
      loading: loadingStudents
    }),
    [students, loadingStudents]
  )

  return (
    <DashboardTemplate>
      <StudentsRegistrationContext.Provider value={contextPayloadForApprovals}>
        <StudentsRegistrationTable title='Admission For Approvals' />
      </StudentsRegistrationContext.Provider>

      <StudentsContext.Provider value={contextPayloadStudents}>
        <StudentsTable title='Approved Students' />
      </StudentsContext.Provider>
    </DashboardTemplate>
  )
}
