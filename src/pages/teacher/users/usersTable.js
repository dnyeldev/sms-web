/* eslint-disable react/prop-types */
import React, {
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Button,
  Card, Col, Form, Row,
} from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { CustomTable } from '../../../components';
import UsersContext from './users.context';
// import { getSessionsStudentsQuery } from './gql';
import { LoginContext } from '../../login';
import styledComponents from 'styled-components';

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`;

export default function Index() {
  const {
    users,
    loading,
  } = useContext(UsersContext);

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataKey: 'profile',
      render: (profile) => {
        const firstName = _.has(profile, 'firstName') ? profile.firstName : null;
        const lastName = _.has(profile, 'lastName') ? profile.lastName : null;
        const fullName = `${firstName} ${lastName}`

        return fullName;
      },
    },
    {
      title: 'Role',
      dataKey: 'roleCode',
    },
    {
      title: 'Gender',
      dataKey: 'profile',
      render: (profile) => {
        const gender = _.has(profile, 'gender') ? profile.gender : null;

        return gender || '';
      },
    },
    {
      title: 'Class',
      dataKey: 'profile',
      render: (profile) => {
        return '1'
      },
    },
    {
      title: 'Date Started',
      dataKey: 'profile',
      center: true,
      render: (profile) => {
        // return moment().format('lll')
        return moment().subtract('M', 6).format('lll')
      },
    },
    {
      title: 'Contact',
      dataKey: 'profile',
      center: true,
      render: (profile) => {
        const mobile = _.has(profile, 'mobile') ? profile.mobile : null;

        return mobile || '';
      },
    },
    {
      title: 'STATUS',
      dataKey: 'status',
    },
    // {
    //   title: 'ACTION',
    //   dataKey: 'uid',
    //   // render: (uid, row) => <RenderAction row={row} />,
    // },
  ]);

  // const onFilter = useCallback((values) => {
  //   const filterInterest = _.has(values, 'interest') ? values.interest : null;
  //   const filterStudent = _.has(values, 'student') ? values.student : null;

  //   setFilterInterest(filterInterest);
  //   setFilterStudent(filterStudent);
  // });

  return (
    <>
      <h3 className="pb-3">System Users</h3>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header>
              {/* <Filters onChange={onFilter} /> */}
            </Card.Header>
            <Card.Body>
              <CustomTable
                columns={columns}
                dataValues={users}
                loading={loading}
              />
            </Card.Body>
          </Card>
        </Col>
      </StyledRow>
    </>
  );
}

// function RenderAction({ row }) {
//   const [interest, setInterest] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [tutorUid, setTutorUid] = useState(null);
//   const [sessionUid, setSessionUid] = useState(null);
//   const [sessionType, setSessionType] = useState(null);
//   const [sessionLink, setSessionLink] = useState(null);
//   const [showStart, setShowStart] = useState(false);
//   const [showEnd, setShowEnd] = useState(false);
//   const [canStart, setCanStart] = useState(false);
//   const [canCancel, setCanCancel] = useState(false);
//   const [canRate, setCanRate] = useState(false);
//   const [canResched, setCanResched] = useState(false);

//   useEffect(() => {
//     const uid = _.has(row, 'uid') ? row.uid : null;
//     const timeslot = _.has(row, 'timeslot') ? row.timeslot : null;
//     const tutorialProfile = _.has(timeslot, 'tutorialProfile') ? timeslot.tutorialProfile : null;
//     const profileInterest = _.has(tutorialProfile, 'interest') ? tutorialProfile.interest : null;
//     const type = _.has(tutorialProfile, 'sessionType') ? tutorialProfile.sessionType : null;
//     const sessionStatus = _.has(row, 'status') ? row.status : null;
//     const link = _.has(row, 'link') ? row.link : null;
//     const allowStart = _.has(row, 'canStart') ? row.canStart : null;
//     const iCanCancel = _.has(row, 'canCancel') ? row.canCancel : null;
//     const iCanResched = _.has(row, 'canResched') ? row.canResched : null;

//     setTutorUid(tutorUid);
//     setInterest(profileInterest);
//     setStatus(sessionStatus);
//     setSessionUid(uid);
//     setSessionType(type);
//     setSessionLink(link);
//     setCanStart(allowStart);
//     setCanCancel(iCanCancel);
//     setCanResched(iCanResched);
//   }, [row]);

//   const contextPayload = useMemo(() => ({
//     sessionUid,
//     interest,
//     sessionType,
//     tutorUid,
//     sessionLink,
//     status,
//     canStart,
//   }), [
//     sessionUid,
//     interest,
//     sessionType,
//     tutorUid,
//     sessionLink,
//     status,
//     canStart,
//   ]);

//   return (
//     <UsersContext.Provider value={contextPayload}>
//       <ViewSession />
//       {showStart && <StartSession />}
//       {showEnd && <EndSession />}
//       {canResched && <RescheduleAction />}
//       {canCancel && <CancelBooking />}
//       {canRate && <RateSession />}
//     </UsersContext.Provider>
//   );
// }

// function Filters(payload) {
//   const { onChange } = payload;
//   const formInstance = useForm();
//   const { control, watch } = formInstance;
//   const { instanceUid } = useContext(LoginContext);
//   const [students, setStudents] = useState([]);

//   const { data: sessionsStudentsResult } = useQuery(getSessionsStudentsQuery, {
//     skip: !instanceUid,
//     variables: { tutorUid: instanceUid },
//   });

//   useEffect(() => {
//     const sessionsStudents = _.has(sessionsStudentsResult, 'getAllSessionsStudents')
//       ? sessionsStudentsResult.getAllSessionsStudents : [];
//     const iStudents = [];

//     _.map(sessionsStudents, (student) => {
//       const tutee = _.has(student, 'tutee') ? student.tutee : null;
//       const tuteeUid = _.has(student, 'tuteeUid') ? student.tuteeUid : null;
//       const others = _.has(tutee, 'others') ? tutee.others : null;
//       const firstName = _.has(others, 'firstName')
//         ? _.startCase(_.toLower(others.firstName)) : null;
//       const lastName = _.has(others, 'lastName')
//         ? _.startCase(_.toLower(others.lastName)) : null;

//       const exists = _.find(iStudents, { tuteeUid });

//       if (!exists) {
//         iStudents.push({
//           tuteeUid, firstName, lastName,
//         });
//       }
//     });

//     setStudents(iStudents);
//   }, [sessionsStudentsResult]);

//   const watchInterest = watch('interest');
//   const watchStudent = watch('student');
//   const watchFavorite = watch('favorite');

//   useMemo(() => {
//     if (watchInterest || watchStudent || watchFavorite || watchFavorite === false) {
//       onChange({
//         interest: watchInterest === 'Filter Interest' ? null : watchInterest,
//         student: watchStudent === 'Filter Student' ? null : watchStudent,
//         favorite: watchFavorite || false,
//       });
//     }
//   }, [
//     watchInterest,
//     watchStudent,
//     watchFavorite,
//   ]);

//   return (
//     <Form noValidate>
//       <Row>
//         <Col lg={{ span: 4 }}>
//           <SelectInterest label="" placeholder="Filter Interest" {...formInstance} />
//         </Col>
//         <Col lg={{ span: 4 }}>
//           <Form.Group as={Col} sm={12} controlId="select.student">
//             <Controller
//               name="student"
//               control={control}
//               render={({ field }) => (
//                 <Form.Select
//                   {...field}
//                 >
//                   <option value={undefined}>Filter Student</option>
//                   {
//                     students.map((i) => {
//                       const tuteeUid = _.has(i, 'tuteeUid') ? i.tuteeUid : null;
//                       const firstName = _.has(i, 'firstName') ? i.firstName : null;
//                       const lastName = _.has(i, 'lastName') ? i.lastName : null;
//                       const title = `${firstName} ${lastName}`;

//                       return <option value={tuteeUid}>{title}</option>;
//                     })
//                   }
//                 </Form.Select>
//               )}
//             />
//           </Form.Group>
//         </Col>
//       </Row>
//     </Form>
//   );
// }

// function RescheduleAction() {
//   const navigate = useNavigate();
//   const { sessionUid } = useContext(SessionContext);

//   const redirectTo = useCallback(() => {
//     navigate('/tutor/calendar', { state: { sessionUid } });
//   });

//   return (
//     <Button
//       variant="link"
//       onClick={redirectTo}
//     >
//       <FontAwesomeIcon icon={solid('calendar-xmark')} />
//       {' '}
//       Reschedule
//     </Button>
//   );
// }