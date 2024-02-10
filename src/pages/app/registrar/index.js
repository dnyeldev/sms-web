import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Error403 from '../../template/components/error403'
import LoginContext from '../login/login.context'

export { default as RegistrarDashboard } from './dashboard'
export { default as RegistrarStudents } from './students'
export { default as RegistrarStudentRegistrations } from './registrations'
export { default as RegistrarSection } from './sections/view'
export { default as RegistrarSections } from './sections'
export { default as RegistrarBroadcast } from './broadcast'

export default function Index() {
  const { roleCode } = useContext(LoginContext)

  if (roleCode !== 'REGISTRAR') {
    return <Error403 />
  }

  return <Outlet />
}
