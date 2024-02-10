import React, { useState, useContext, useEffect } from 'react';
import {
  Col, Button, Image, Badge,
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import AlertError from '../alertError';
import PageContext from './page.context'

export default function myProfile() {
  const { user } = useContext(PageContext)
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [contact, setContact] = useState(null)
  const [dob, setDob] = useState(null)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    const profile = _.has(user, 'profile') ? user.profile : null;
    const userStatus = _.has(user, 'status') ? user.status : null;
    const firstName = _.has(profile, 'firstName') ? profile.firstName : null;
    const lastName = _.has(profile, 'lastName') ? profile.lastName : null;
    const email = _.has(profile, 'email') ? profile.email : null;
    const mobile = _.has(profile, 'mobile') ? profile.mobile : null;
    const birthDay = _.has(profile, 'birthDay') ? profile.birthDay : null;
    const curAddress = _.has(profile, 'address') ? profile.address : null;
    const address1 = _.has(curAddress, 'address1') ? curAddress.address1 : null;
    const address2 = _.has(curAddress, 'address2') ? curAddress.address2 : null;
    const city = _.has(curAddress, 'city') ? curAddress.city : null;
    const postalCode = _.has(curAddress, 'postalCode') ? curAddress.postalCode : null;
    const countryCode = _.has(curAddress, 'countryCode') ? curAddress.countryCode : null;
    const parsedAddress = `${address1}, ${address2}, ${city}, ${postalCode}, ${countryCode}`

    setStatus(userStatus)
    setName(`${firstName} ${lastName}`)
    setEmail(email)
    setContact(mobile)
    setDob(birthDay)
    setAddress(parsedAddress)
  }, [{
    user
  }])

  return (
    <div className="row">
      <div className="col-md-12">
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
                {avatar
                  ? (
                    <Image
                      className="pro-avatar"
                      src={avatar}
                      width={100}
                      height={100}
                    />
                  )
                  : (
                    <div className="pro-avatar">
                      {name && name.charAt(0).toUpperCase()}
                    </div>
                  )}
              </div>
              <div className="col ml-md-n2 profile-user-info">
                <h4 className="mb-0">
                  {name}
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
                  {/* <UploadAvatarForm userUid={uid} onError={handleUploadError} /> */}
                </div>
              </div>

              <div className="col" align="right">
                <RenderStatus status={status} />
              </div>
            </div>
          </div>

          <div className="card-footer">
            {/* <Row>
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
              </Row> */}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between">
                  <span>Personal Details</span>
                </h5>
                <div className="row">
                  <p className="col-sm-2 text-muted mb-0 mb-sm-3">Name</p>
                  <p className="col-sm-10">
                    {name}
                  </p>
                </div>
                <div className="row">
                  <p className="col-sm-2 text-muted mb-0 mb-sm-3">Email</p>
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
                  <p className="col-sm-10">{moment(dob).format('LL')}</p>
                </div>
                <div className="row">
                  <p className="col-sm-2 text-muted mb-0 mb-sm-3">Mobile</p>
                  <p className="col-sm-10">{contact}</p>
                </div>
                <div className="row">
                  <p className="col-sm-2 text-muted mb-0 mb-sm-3">Address</p>
                  <p className="col-sm-10">
                    {address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const RenderStatus = ({ status }) => {
  const bg = status === 'INACTIVE' ? 'danger' : 'primary'

  return (<h3><Badge bg={bg}>{status}</Badge></h3>)
}
