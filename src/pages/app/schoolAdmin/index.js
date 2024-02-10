import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Error403 from '../../template/components/error403';
import LoginContext from '../login/login.context';

export { default as SchoolAdminDashboard } from './dashboard';
export { default as SchoolAdminUsers } from './users';
export { default as SchoolAdminAddUser } from './users/addUser';
export { default as SchoolAdminUserProfile } from './users/profile';
export { default as SchoolAdminStudents } from './students';
export { default as SchoolAdminSchoolYears } from './schoolYears';
export { default as SchoolAdminSections } from './sections';
export { default as SchoolAdminSection } from './sections/view';
export { default as SchoolAdminSubjects } from './subjects';

export default function Index() {
  const { roleCode } = useContext(LoginContext);

  if (roleCode !== 'SCHOOL_ADMIN') { return <Error403 />; }

  return (
    <Outlet />
  );
}