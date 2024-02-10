import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import _ from 'lodash';
import RegistryClient from '../../../RegistryClient';
import { GET_USER_ROLE_COUNT } from './gql';
import { LoadingSpinner } from '../../../components'

export default function userCountList() {
  const [roles] = useState(['TUTOR', 'TUTEE', 'PARTNER_MERCHANT']);

  const { data, loading } = useQuery(GET_USER_ROLE_COUNT, {
    client: RegistryClient,
    variables: {
      roles,
    },
  });

  const resultData = _.has(data, 'getUserRolesCount') ? data.getUserRolesCount : null;
  const tutorResult = resultData && resultData.find((res) => res.roleCode === 'TUTOR');
  const tutorCount = _.has(tutorResult, 'total') ? tutorResult.total : 0;

  const tuteeResult = resultData && resultData.find((res) => res.roleCode === 'TUTEE');
  const tuteeCount = _.has(tuteeResult, 'total') ? tuteeResult.total : 0;

  const partnerMerchantResult = resultData && resultData.find((res) => res.roleCode === 'PARTNER_MERCHANTS');
  const partnerMerchantCount = _.has(partnerMerchantResult, 'total') ? partnerMerchantResult.total : 0;

  const collaboratorsResult = resultData && resultData.find((res) => res.roleCode === 'PARTNER_MERCHANTS_COLLABORATORS');
  const collaboratorsCount = _.has(collaboratorsResult, 'total') ? collaboratorsResult.total : 0;

  return (
    <Row>
      <Col lg={3} className="mb-4 dash-board-list yellow">
        <div className="dash-widget" style={{ height: '100%' }}>
          <div className="circle-bar">
            <div className="icon-col">
              <i className="fas fa-users" />
            </div>
          </div>
          <div className="dash-widget-info">
            <h3>
              {!loading ? tutorCount : <LoadingSpinner text='' />}
            </h3>
            <h6>Freelance Tutors</h6>
          </div>
        </div>
      </Col>
      <Col lg={3} className="mb-4 dash-board-list blue">
        <div className="dash-widget" style={{ height: '100%' }}>
          <div className="circle-bar">
            <div className="icon-col">
              <i className="fas fa-users" />
            </div>
          </div>
          <div className="dash-widget-info">
            <h3>{!loading ? tuteeCount : <LoadingSpinner text='' />} </h3>
            <h6>Students</h6>
          </div>
        </div>
      </Col>
      <Col lg={3} className="mb-4 dash-board-list pink">
        <div className="dash-widget" style={{ height: '100%' }}>
          <div className="circle-bar">
            <div className="icon-col">
              <i className="fas fa-users" />
            </div>
          </div>
          <div className="dash-widget-info">
            <h3>{!loading ? partnerMerchantCount : <LoadingSpinner text='' />}</h3>
            <h6>Partner Merchants</h6>
          </div>
        </div>
      </Col>
      <Col lg={3} className="mb-4 dash-board-list blue">
        <div className="dash-widget " style={{ height: '100%' }}>
          <div className="circle-bar">
            <div className="icon-col">
              <i className="fas fa-users" />
            </div>
          </div>
          <div className="dash-widget-info">
            <h3>{!loading ? collaboratorsCount : <LoadingSpinner text='' />}</h3>
            <h6>Partner Merchants Collaborators</h6>
          </div>
        </div>
      </Col>
    </Row>
  );
}
