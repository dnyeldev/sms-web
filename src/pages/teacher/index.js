import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Error403 from '../../template/components/error403'
import LoginContext from '../login/login.context'

export { default as TeacherDashboard } from './dashboard'
export { default as TeacherStudents } from './students'
export { default as TeacherSection } from './sections/section'
export { default as TeacherSections } from './sections'
export { default as TeacherSectionSubject } from './sections/subject'

export default function Index() {
  const { roleCode } = useContext(LoginContext)

  if (roleCode !== 'TEACHER') {
    return <Error403 />
  }

  return <Outlet />
}
