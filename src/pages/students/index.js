import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Error403 from '../../template/components/error403'
import LoginContext from '../login/login.context'

export { default as RegisterStudent } from './registration'
export { default as RegisterSuccess } from './registration/success'
export { default as StudentDashboard } from './dashboard'
export { default as StudentProfile } from './myProfile'
export { default as StudentProfileSettings } from './myProfile/settings'
export { default as StudentSection } from './section'
export { default as StudentGrades } from './grades'
export { default as StudentSubjects } from './subjects'

export default function Index() {
  const { userId, roleCode } = useContext(LoginContext)

  if (roleCode !== 'STUDENT') {
    return <Error403 />
  }

  return <Outlet />
}
