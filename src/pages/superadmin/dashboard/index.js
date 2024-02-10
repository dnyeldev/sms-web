import React from 'react';
import { Col, Row } from 'react-bootstrap';
import UserCountList from './userCountList';
import { DashboardTemplate } from '../../../template/components';
import TopTutors from './topTutors';
import TopStudents from './topStudents';
import MonthlyEarning from '../../../template/admin/monthlyEarning';
import TopTutorLowRating from './topTutorLowRating';

export default function Index() {
  return (
    <DashboardTemplate>
      <Row>
        <Col lg={12} className="mb-4">
          <UserCountList />
        </Col>
        <Col lg={12} className="mb-4">
          <MonthlyEarning />
        </Col>
        <Col lg={6} className="mb-4">
          <TopTutors />
        </Col>
        <Col lg={6} className="mb-4">
          <TopStudents />
        </Col>
        <Col lg={6} className="mb-4">
          <TopTutorLowRating />
        </Col>
      </Row>
    </DashboardTemplate>
  );
}
