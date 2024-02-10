import React from 'react';
import { Col, Row } from 'react-bootstrap';
// import UserCountList from './userCountList';
import { DashboardTemplate } from '../../../template/components';
// import TopTutors from './topTutors';
// import TopStudents from './topStudents';
// import MonthlyEarning from '../../../template/admin/monthlyEarning';
import StudentCount from './studentCount';
import Announcement from './announcement';
import ChartStudents from './chartStudents';
import SchoolCalendar from './schoolCalendar';
export default function Index() {
  return (
    <DashboardTemplate>
      <Row>
        {/* <Col lg={4} className="mb-4">
          <StudentCount/>
        </Col> */}
        <Col className="mb-4">
          <Announcement/>
        </Col>
        {/* <Col lg={4} className="mb-4">
          <ChartStudents/>
        </Col> */}
        {/* <Col lg={12} className="mb-4">
          <SchoolCalendar/>
        </Col> */}
      </Row>
    </DashboardTemplate>
  );
}
