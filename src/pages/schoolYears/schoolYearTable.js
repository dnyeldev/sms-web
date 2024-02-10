/* eslint-disable react/prop-types */
import React, {
  useCallback,
  useContext, useEffect, useMemo, useState,
} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Button,
  Card, Col, Row,
} from 'react-bootstrap';
import { CustomTable } from '../../components';
import UsersContext from './schoolYear.context';
import styledComponents from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GET_SCHOOL_YEARS } from './gql';
import { useQuery } from '@apollo/client';
import CreateSchoolYearModal from './createSchoolYearModal'
import ChangeStatus from './changeStatus'

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
    userId
  } = useContext(UsersContext);
  const navigate = useNavigate()

  const [schoolYears, setSchoolYears] = useState([]);

  const { data, loading } = useQuery(GET_SCHOOL_YEARS);

  useEffect(() => {
    const sys = _.has(data, 'getSchoolYears') ? data.getSchoolYears : [];

    setSchoolYears(sys);
  }, [data]);

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataKey: 'name',
      // render: (name, row) => {
      //   const syId = _.has(row, 'id') ? row.id : null

      //   return <Button variant='link' onClick={() => navigate('view', { state: { syId } })}>{name}</Button>
      // }
    },
    {
      title: 'Start Date',
      dataKey: 'startDate',
      center: true,
      render: (startDate) => {
        return moment(startDate).format('ll')
      },
    },
    {
      title: 'Closing Date',
      dataKey: 'endDate',
      center: true,
      render: (endDate) => {
        // return moment().format('lll')
        return moment(endDate).format('ll')
      },
    },
    {
      title: 'STATUS',
      dataKey: 'status',
      render: (status, row) => {
        const id = _.has(row, 'id') ? row.id : null

        return (
          <ChangeStatus id={id}>
            {
              ({ onClick }) => <><Button variant='link' onClick={onClick}>{status}</Button></>
            }
          </ChangeStatus>
        )
      },
    },
  ]);

  const addUser = useCallback(() => {
    navigate('add');
  }, [])

  return (
    <>
      <h3 className="pb-3">School Years</h3>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header>
              <CreateSchoolYearModal />
            </Card.Header>
            <Card.Body>
              <CustomTable
                columns={columns}
                dataValues={schoolYears}
                loading={loading}
              />
            </Card.Body>
          </Card>
        </Col>
      </StyledRow>
    </>
  );
}