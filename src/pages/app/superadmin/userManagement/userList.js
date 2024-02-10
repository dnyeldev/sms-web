import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { GET_ALL_USERS } from './gql';
import client from '../../../RegistryClient';
import SelectRole from './selectRole';
import { CustomTable } from '../../../components';
import { userRoleLabel } from '../../../constants';
import UserImage from '../../../components/userImage';
import { AlertError } from '../../../components'
import DeleteUser from './deleteUser'

export default function Index({
  onClickAdd,
}) {

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchText, setSearchText] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [error, setError] = useState(null)

  const { loading, data } = useQuery(GET_ALL_USERS, {
    fetchPolicy: 'network-only',
    client,
    variables: {
      offset: pageSize ? pageSize * (page - 1) : 0,
      limit: pageSize,
      searchText,
      filter: {
        roleCodes: selectedRoles,
        status: selectedStatus,
      },
      exceptRoles: ['TUTEE', 'TUTOR'],
    },
  });

  const result = _.has(data, 'getAllUsers') ? data.getAllUsers : null;
  const dataResult = _.has(result, 'rows') ? result.rows : [];
  const rowCount = _.has(result, 'count') ? result.count : 0;

  const columns = [
    {
      title: 'BASIC INFO',
      key: 'fullname',
      render: (text, record) => {
        const uid = _.has(record, 'uid') ? record.uid : null;
        const email = _.has(record, 'email') ? record.email : null;
        const userProfile = _.has(record, 'userProfile') ? record.userProfile : null;
        const firstName = _.has(userProfile, 'firstName') ? userProfile.firstName : null;
        const lastName = _.has(userProfile, 'lastName') ? userProfile.lastName : null;
        const avatar = _.has(record, 'avatar') ? record.avatar : null;
        const avatarStorage = _.has(avatar, 'storage') ? avatar.storage : null;

        const avatarPath = _.has(avatarStorage, 'path') ? avatarStorage.path : null;

        return (
          <h2 className="table-avatar">
            <Link to={`/profile/${uid}`} className="avatar avatar-sm me-2">
              <UserImage filePath={avatarPath} />
            </Link>
            <Link to={`/profile/${uid}`}>
              {firstName}
              {' '}
              {lastName}
              <span>
                <span
                  className="__cf_email__"
                  data-cfemail="81f5f8f3eeefe4f3eee3e4f3f5f2c1e0e5eee3e4afe2eeec"
                >
                  {email}
                </span>
              </span>

            </Link>
          </h2>
        );
      },
    },
    {
      title: 'USERNAME',
      dataKey: 'username'
    },
    {
      title: 'ROLE',
      dataKey: 'roleCode',
      render: (text) => (text ? userRoleLabel[text] : text),
    },
    {
      title: 'STATUS',
      dataKey: 'status',
    },
    {
      title: 'ACTION',
      dataKey: 'uid',
      render: (text, record) => {
        const uid = _.has(record, 'uid') ? record.uid : null;
        const userProfile = _.has(record, 'userProfile') ? record.userProfile : null;
        const firstName = _.has(userProfile, 'firstName') ? userProfile.firstName : null;
        const lastName = _.has(userProfile, 'lastName') ? userProfile.lastName : null;

        return <DeleteUser
          uid={uid}
          firstName={firstName}
          lastName={lastName}
          onError={({ title, message }) => {
            setError({
              title,
              message
            })
          }}
        />
      },
    },
  ];

  const onSearch = (value) => {
    setPage(1);
    setSearchText(value);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h4 className="col-md-4">Users List</h4>
        <div className="row mb-4 justify-content-end gap-2">
          <div className="col-lg-3">
            <form className="search-form custom-search-form">
              <div className="input-group">
                <input
                  type="text"
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search User"
                  className="form-control"
                />
                <Button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-search" />

                </Button>
              </div>
            </form>
          </div>
          <div className="col-lg-2 d-grid">
            <Button onClick={() => onClickAdd()} type="button">
              <i className="fa fa-plus" />
              {' '}
              Add User
            </Button>
          </div>
        </div>
        <div className="row mb-4 gap-2">
          <div className="col-lg-3">
            <SelectRole onSelect={(value) => setSelectedRoles(value)} />
          </div>
          <div className="col-lg-3">
            <select
              className="form-select"
              aria-label="select status"
              onChange={(e) => setSelectedStatus(e.target.value)}
              placeholder="Select Status"
            >
              <option value="" selected>All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="FOR_APPROVAL">For Approval</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        {error && (
          <Row>
            <Col lg={12}>
              <AlertError
                error={error.message}
                title={error.title}
                onClose={() => setError(null)}
              />
            </Col>
          </Row>
        )}

        <div className="card">
          <div className="card-body">
            <CustomTable
              loading={loading}
              columns={columns}
              page={page}
              pageSize={pageSize}
              totals={rowCount}
              dataValues={dataResult}
              onPageChange={(nPage) => setPage(nPage)}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
