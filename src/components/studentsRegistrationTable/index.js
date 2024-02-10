/* eslint-disable react/prop-types */
import React, { useContext, useMemo } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Button,
  Card, Col, Row,
} from 'react-bootstrap';
import CustomTable from '../table';
import UsersContext from './page.context';
import styledComponents from 'styled-components';
import ApproveModal from './approveModal'
import StudentProfile from '../studentProfile';

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
        const userId = _.has(profile, 'userId') ? profile.userId : null;
        const firstName = _.has(profile, 'firstName') ? profile.firstName : null;
        const lastName = _.has(profile, 'lastName') ? profile.lastName : null;
        const fullName = `${firstName} ${lastName}`

        return (
          <StudentProfile userId={userId}>
            {
              ({ onClick }) => <><Button variant='link' onClick={onClick}>{fullName}</Button></>
            }
          </StudentProfile>
        )
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
      title: 'Registration Date',
      dataKey: 'createdAt',
      center: true,
      render: (createdAt) => {
        return moment(createdAt).format('lll')
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
      dataKey: 'status'
    },
    // {
    //   title: 'STATUS',
    //   dataKey: 'status',
    //   render: (status, row) => {
    //     const userId = _.has(row, 'id') ? row.id : null

    //     return (
    //       <ApproveModal userId={userId}>
    //         {
    //           ({ onClick }) => <><Button variant='link' onClick={onClick}>{status}</Button></>
    //         }
    //       </ApproveModal>
    //     )
    //   },
    // },
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