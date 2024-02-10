/* eslint-disable react/prop-types */
import React, {
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import _ from 'lodash';
import {
  Card, Col, Row,
} from 'react-bootstrap';
import { CustomTable } from '../../../components';
import { LoginContext } from '../../login';
import styledComponents from 'styled-components';
import { useQuery } from '@apollo/client';

const StyledRow = styledComponents(Row)`
  table {
    font-size: 12px;

    .btn-link {
      font-size: 12px;
    }
  }
`;

export default function Index() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = useMemo(() => [
    {
      title: 'LRN',
      dataKey: 'lrnNo',
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
      title: 'STATUS',
      dataKey: 'status',
    },
  ]);

  return (
    <>
      <h4 className="pb-3">Section Students</h4>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header>
              {/* <Filters onChange={onFilter} /> */}
            </Card.Header>
            <Card.Body>
              <CustomTable
                columns={columns}
                dataValues={students}
                loading={loading}
              />
            </Card.Body>
          </Card>
        </Col>
      </StyledRow>
    </>
  );
}