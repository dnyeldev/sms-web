import React, { useState, useContext, useEffect } from 'react';
import {
  Tab, Nav, Row, Col, Button, Image,
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import ChangePasswordForm from '../../pages/profile/changePasswordForm';
import UploadAvatarForm from '../components/uploadAvatarForm';
import { AlertError } from '../../components';
import UploaderContext from '../../modules/uploader/uploader.context';

export default function myProfile({ data, onClickEdit }) {
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const { getFileLink } = useContext(UploaderContext);

  const uid = _.has(data, 'uid') ? data.uid : null;
  const userProfile = _.has(data, 'userProfile') ? data.userProfile : null;
  const email = _.has(data, 'email') ? data.email : null;
  const username = _.has(data, 'username') ? data.username : null;

  const firstName = _.has(userProfile, 'firstName') ? userProfile.firstName : null;
  const lastName = _.has(userProfile, 'lastName') ? userProfile.lastName : null;
  const mobile = _.has(userProfile, 'mobile') ? userProfile.mobile : null;
  const birthDate = _.has(userProfile, 'birthDate') ? userProfile.birthDate : null;
  const address = _.has(userProfile, 'address') ? userProfile.address : null;
  const address1 = _.has(address, 'address1') ? address.address1 : null;
  const address2 = _.has(address, 'address2') ? address.address2 : null;
  const city = _.has(address, 'city') ? address.city : null;
  const postalCode = _.has(address, 'postalCode') ? address.postalCode : null;
  const countryCode = _.has(address, 'countryCode') ? address.countryCode : null;

  const avatar = _.has(data, 'avatar') ? data.avatar : null;
  const avatarStorage = _.has(avatar, 'storage') ? avatar.storage : null;

  const avatarPath = _.has(avatarStorage, 'path') ? avatarStorage.path : null;

  const handleUploadError = (err) => {
    setError({
      title: 'Failed to upload avatar',
      message: err,
    });
  };

  useEffect(() => {
    if (avatarPath) {
      getFileLink({ filePath: avatarPath }).then((uri) => {
        if (uri) {
          setAvatarUrl(uri);
        }
      });
    }
  }, [avatarPath]);

  return (
    <div className="row">
      <div className="col-md-12">
        <Tab.Container id="admin-profile-tabs" defaultActiveKey="first" justify>
          <div className="card">

            <div className="card-body">
              {error && (
                <Col lg={12}>
                  <AlertError
                    error={error.message}
                    title={error.title}
                    onClose={() => setError(null)}
                  />
                </Col>
              )}
              <div className="row align-items-center">
                <div className="col-auto">
                  {avatarUrl
                    ? (
                      <Image
                        className="pro-avatar"
                        src={avatarUrl}
                        width={100}
                        height={100}
                      />
                    )
                    : (
                      <div className="pro-avatar">
                        {firstName && firstName.charAt(0).toUpperCase()}
                        {lastName && lastName.charAt(0).toUpperCase()}
                      </div>
                    )}
                </div>
                <div className="col ml-md-n2 profile-user-info">
                  <h4 className="mb-0">
                    {firstName}
                    {' '}
                    {lastName}
                  </h4>
                  <h6 className="text-muted">
                    <a
                      href="/cdn-cgi/l/email-protection"
                      className="__cf_email__ text-muted"
                      data-cfemail="60010c0c050e04011609132001040d090e4e030f0d"
                    >
                      {email}
                    </a>

                  </h6>
                  <div className="col-xl-3">
                    <UploadAvatarForm userUid={uid} onError={handleUploadError} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <Row>
                <Col xs={12}>
                  <Nav variant="pills" className="flex-row nav nav-tabs nav-tabs-solid bg-transparent">
                    <Nav.Item>
                      <Nav.Link eventKey="first">About</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Password</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
            </div>
          </div>

          <div>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between">
                          <span>Personal Details</span>
                          <Button variant="link" className="edit-link" onClick={() => onClickEdit()}>
                            <i
                              className="fa fa-edit me-1"
                            />
                            {' '}
                            Edit

                          </Button>
                        </h5>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">Name</p>
                          <p className="col-sm-10">
                            {firstName}
                            {' '}
                            {lastName}
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">Username</p>
                          <p className="col-sm-10">{username}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">Email ID</p>
                          <p className="col-sm-10">
                            <a
                              href="/cdn-cgi/l/email-protection"
                              className="__cf_email__"
                              data-cfemail="7c1d10101912181d0a150f3c19041d110c1019521f1311"
                            >
                              {email}
                            </a>
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">Date of Birth</p>
                          <p className="col-sm-10">{moment(birthDate).isValid() && moment(birthDate).format('LL')}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">Mobile</p>
                          <p className="col-sm-10">{mobile}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">Address 1</p>
                          <p className="col-sm-10">
                            {address1}
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">Address 2</p>
                          <p className="col-sm-10">
                            {address2}
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">City</p>
                          <p className="col-sm-10">
                            {city}
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">Postal Code</p>
                          <p className="col-sm-10">
                            {postalCode}
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">Country</p>
                          <p className="col-sm-10">
                            {countryCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>

            <Tab.Content>
              <Tab.Pane eventKey="second">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Change Password</h5>
                    <div className="row">
                      <div className="col-md-10 col-lg-6">
                        <ChangePasswordForm />
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>

          </div>
        </Tab.Container>
      </div>
    </div>

  );
}
