/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Card, Col, Row,
} from 'react-bootstrap';
import CustomTable from '../table';
import UsersContext from './page.context';
import styledComponents from 'styled-components';

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`;

export default function Index({ title = 'Students', headers = null }) {
  const {
    users,
    loading,
  } = useContext(UsersContext);

  const columns = useMemo(() => [
    {
      title: 'LRN #',
      dataKey: 'profile',
      render: (profile) => {
        const lrn = _.has(profile, 'lrnNo') ? profile.lrnNo : null

        return lrn || ''
      }
    },
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
    }
  ]);

  return (
    <>
      <h3 className="pb-3">{title}</h3>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header>
              {headers}
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