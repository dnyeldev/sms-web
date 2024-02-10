import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { DashboardTemplate } from '../../../template/components';
import Count from './count';
import Announcement from './announcement';
import ChartEarnings from './chartEarnings';
import ChartStudents from './chartStudents';
import SchoolCalendar from './schoolCalendar';
export default function Index() {
  return (
    <DashboardTemplate>
      <Row>
        <Col lg={6} className="mb-4">
          <Count/>
        </Col>
        <Col lg={6} className="mb-4">
          <Announcement/>
        </Col>
        <Col lg={6} className="mb-4">
          <ChartEarnings/>
        </Col>
        <Col lg={6} className="mb-4">
          <ChartStudents/>
        </Col>
        {/* <Col lg={12} className="mb-4">
          <SchoolCalendar/>
        </Col> */}
      </Row>
    </DashboardTemplate>
  );
}
