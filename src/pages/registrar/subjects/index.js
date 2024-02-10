import React, {
  useContext, useMemo,
} from 'react';
import _ from 'lodash';
import { DashboardTemplate } from '../../../template/components';
import { LoginContext } from '../../login';
import SubjectsContext from '../../subjects/subjects.context';
import SubjectsTable from '../../subjects/subjectsTable'

export default function Index() {
  const { userId } = useContext(LoginContext);

  const contextPayload = useMemo(() => ({
    userId
  }), [userId]);

  return (
    <DashboardTemplate>
      <SubjectsContext.Provider value={contextPayload}>
        <SubjectsTable />
      </SubjectsContext.Provider>
    </DashboardTemplate>
  );
}
