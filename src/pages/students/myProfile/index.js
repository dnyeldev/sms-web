import React, { useMemo } from 'react';
import MyProfile from './personalProfile';
import { DashboardTemplate } from '../../../template/components';
import MyProfileContext from './myprofile.context';

export { default as MyProfileContext } from './myprofile.context';

export default function Index() {
  const contextPayload = useMemo(() => ({

  }), [

  ]);

  return (
    <MyProfileContext.Provider value={contextPayload}>
      <DashboardTemplate>
        <MyProfile />
      </DashboardTemplate>
    </MyProfileContext.Provider>
  );
}
