import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Error403 from '../../template/components/error403';
import LoginContext from '../login/login.context';

export default function Index() {
  const { roleCode } = useContext(LoginContext);

  if (!roleCode) { return <Error403 />; }

  return (
    <Outlet />
  );
}