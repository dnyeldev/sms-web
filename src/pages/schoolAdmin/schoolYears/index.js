import React, {
  useContext, useMemo,
} from 'react';
import _ from 'lodash';
import { DashboardTemplate } from '../../../template/components';
import { LoginContext } from '../../login';
import UsersContext from '../../schoolYears/schoolYear.context';
import SchoolYearTable from '../../schoolYears/schoolYearTable'

export default function Index() {
  const { userId } = useContext(LoginContext);

  const contextPayload = useMemo(() => ({
    userId
  }), [userId]);

  return (
    <DashboardTemplate>
      <UsersContext.Provider value={contextPayload}>
        <SchoolYearTable />
      </UsersContext.Provider>
    </DashboardTemplate>
  );
}
