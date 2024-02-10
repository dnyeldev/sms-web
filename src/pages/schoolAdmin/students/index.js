import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
import { DashboardTemplate } from '../../../template/components';
import { GET_SCHOOL_USERS } from './gql';
import { LoginContext } from '../../login';
import StudentsContext from '../../../components/studentsTable/page.context';
import StudentsTable from '../../../components/studentsTable'

export default function Index() {
  const { userId } = useContext(LoginContext);
  const [users, setUsers] = useState([]);

  const { data, loading } = useQuery(GET_SCHOOL_USERS, {
    skip: !userId,
    variables: {
      roleCodes: ['STUDENT']
    },
    pollInterval: 5000,
  });

  useEffect(() => {
    const users = _.has(data, 'getAllUsers') ? data.getAllUsers : [];

    setUsers(users);
  }, [data]);

  const contextPayload = useMemo(() => ({
    users,
    loading,
  }), [
    users,
    loading,
  ]);

  return (
    <DashboardTemplate>
      <StudentsContext.Provider value={contextPayload}>
        <StudentsTable />
      </StudentsContext.Provider>
    </DashboardTemplate>
  );
}
