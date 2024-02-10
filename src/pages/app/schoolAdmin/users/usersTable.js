/* eslint-disable react/prop-types */
import React, {
  useCallback,
  useContext, useMemo,
} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Button,
  Card, Col, Row,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { CustomTable } from '../../../components';
import UsersContext from './users.context';
import styledComponents from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ChangeUserStatus from '../../../components/changeUserStatus'

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
  const navigate = useNavigate()

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataKey: 'profile',
      render: (profile) => {
        const userId = _.has(profile, 'userId') ? profile.userId : null;
        const firstName = _.has(profile, 'firstName') ? profile.firstName : null;
        const lastName = _.has(profile, 'lastName') ? profile.lastName : null;
        const fullName = `${firstName} ${lastName}`

        return <Button variant='link' onClick={() => navigate('profile', { state: { userId } })}>{fullName}</Button>
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
      render: (status, row) => {
        const userId = _.has(row, 'id') ? row.id : null

        return (
          <ChangeUserStatus userId={userId}>
            {
              ({ onClick }) => <><Button variant='link' onClick={onClick}>{status}</Button></>
            }
          </ChangeUserStatus>
        )
      },
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

  const addUser = useCallback(() => {
    navigate('add');
  }, [])

  return (
    <>
      <h3 className="pb-3">System Users</h3>
      <StyledRow>
        <Col>
          <Card>
            <Card.Header>
              <Button disabled={loading} onClick={addUser}>
                <FontAwesomeIcon icon={solid('user-plus')} />
                {' '}
                {loading ? 'Loading…' : 'Add User'}
              </Button>
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