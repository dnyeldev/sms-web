import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useQuery } from '@apollo/client';
import _ from 'lodash';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card, Col, Row } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import styledComponents from 'styled-components';
import { getMonthlyAttendanceQuery } from './gql';
import { LoginContext } from '../login';
import AttendanceContext from './attendance.context';

ChartJS.register(ArcElement, Tooltip, Legend);

const DateInput = styledComponents.input`
text-align: right;
`;

export default function Index() {
  const { instanceUid } = useContext(LoginContext);
  const [attendances, setAttendances] = useState([]);
  const [date, setDate] = useState(new Date());

  const { data: attendanceRsult } = useQuery(getMonthlyAttendanceQuery, {
    skip: !instanceUid || !date,
    variables: { instanceUid, searchDate: date },
  });

  useEffect(() => {
    const rows = _.has(attendanceRsult, 'getMonthlyAttendance') ? attendanceRsult.getMonthlyAttendance : [];

    setAttendances(rows);
  }, [attendanceRsult]);

  const contextPayload = useMemo(() => ({
    attendances,
    date,
    setDate,
  }), [
    attendances,
    date,
    setDate,
  ]);

  return (
    <AttendanceContext.Provider value={contextPayload}>
      <Card>
        <Card.Body>
          <Card.Title>Attendance Monthly Summary</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Completed vs No Show attendances</Card.Subtitle>
          <Row>
            <Col lg={{ span: 12 }}><MonthlySummary /></Col>
          </Row>
        </Card.Body>
      </Card>
    </AttendanceContext.Provider>
  );
}

function MonthlySummary() {
  const { attendances, date, setDate } = useContext(AttendanceContext);
  const [completedTotal, setCompletedTotal] = useState(0);
  const [noShowTotal, setShowTotal] = useState(0);

  useEffect(() => {
    const completed = _.filter(attendances, { status: 'COMPLETED' });
    const noShow = _.filter(attendances, { status: 'NO_SHOW' });

    setCompletedTotal(completed ? completed.length : 0);
    setShowTotal(noShow ? noShow.length : 0);
  }, [attendances]);

  const data = useMemo(() => ({
    labels: ['Completed', 'No Show'],
    datasets: [
      {
        label: '# of Votes',
        data: [completedTotal, noShowTotal],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }), [completedTotal, noShowTotal]);

  return (
    <Card>
      <Card.Body>
        <Row className="pt-3">
          <Col className="mb-3" lg={{ span: 6, offset: 6 }}>
            <ReactDatePicker
              dateFormat="MM/yyyy"
              customInput={<DateInput type="text" className="form-control datetimepicker" />}
              selected={date}
              maxDate={new Date()}
              onChange={(newDate) => setDate(newDate)}
              showMonthYearPicker
            />
          </Col>
          <Col lg={{ span: 12 }}><Pie data={data} /></Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
