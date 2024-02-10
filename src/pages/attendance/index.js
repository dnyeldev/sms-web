import React, {
  useContext,
  useEffect, useMemo, useState,
} from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import _ from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import Session from './session';
import { getAttendanceQuery, getSessionQuery, getUserQuery } from './gql';
import { LoginContext } from '../login';
import AttendanceContext from './attendance.context';
import RegistryClient from '../../RegistryClient';

export default function Index() {
  // const navigate = useNavigate();
  // const loc = useLocation();
  // const state = _.has(loc, 'state') ? loc.state : null;
  // const sessionUid = _.has(state, 'sessionUid') ? state.sessionUid : null;
  // const { instanceUid, roleCode } = useContext(LoginContext);
  // const [tutorName, setTutorName] = useState(null);

  // const { data: sessionResult } = useQuery(getSessionQuery, {
  //   skip: !sessionUid,
  //   variables: { uid: sessionUid },
  // });

  // const [fetchUser] = useLazyQuery(getUserQuery, { client: RegistryClient });

  // useEffect(() => {
  //   const attendance = _.has(attendanceResult, 'getAttendance') ? attendanceResult.getAttendance : null;
  //   const uid = _.has(attendance, 'uid') ? attendance.uid : null;
  //   const attStatus = _.has(attendance, 'status') ? attendance.status : null;

  //   setAttendanceUid(uid);
  //   setAttendanceStatus(attStatus);
  // }, [attendanceResult]);

  const contextPayload = useMemo(() => ({

  }), [

  ]);

  return (
    <div className="content">
      <div className="container-fluid">
        <AttendanceContext.Provider value={contextPayload}>
          {/* <Session /> */}
        </AttendanceContext.Provider>
      </div>
    </div>
  );
}
