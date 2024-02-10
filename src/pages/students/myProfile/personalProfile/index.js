import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Avatar, CustomPlaceHolder, ImageViewer } from '../../../../components';
import { LoginContext } from '../../../login';
import { getInterestQuery, getUserFilesQuery, getUserQuery } from './gql';
// import RegistryClient from '../../../../RegistryClient';

const getFileUrl = (payload) => {
  const { files = [], fileCategory } = payload

  const file = _.find(files, { fileCategory });
  const storage = _.has(file, 'storage') ? file.storage : null;
  const url = _.has(storage, 'path') ? storage.path : null;

  return url
}

export default function Index() {
  const navigate = useNavigate();
  const { userUid, roleCode } = useContext(LoginContext);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [middleInitial, setMiddleInitial] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [birthDate, setBirthDate] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [statusVariant, setStatusVariant] = useState('default');
  const [interest, setInterest] = useState(null);
  const [studGovId, setStudGovId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [guardianId, setGuardianId] = useState(null);
  const [gFirstName, setGFirstName] = useState(null);
  const [gMiddleInitial, setGMiddleInitial] = useState(null);
  const [gLastName, setGLastName] = useState(null);

  // const { loading, data: userResult } = useQuery(getUserQuery, {
  //   skip: !userUid,
  //   client: RegistryClient,
  //   variables: { uid: userUid },
  // });

  const [getInterest] = useLazyQuery(getInterestQuery);

  // useEffect(() => {
  //   const user = _.has(userResult, 'getUser') ? userResult.getUser : null;
  //   const iUserStatus = _.has(user, 'status') ? user.status : null;
  //   const profile = _.has(user, 'userProfile') ? user.userProfile : null;
  //   const iEmail = _.has(user, 'email') ? user.email : null;
  //   const iFirstName = _.has(profile, 'firstName') ? profile.firstName : null;
  //   const iMI = _.has(profile, 'middleInitial') ? profile.middleInitial : null;
  //   const iLastName = _.has(profile, 'lastName') ? profile.lastName : null;
  //   const iBirthDate = _.has(profile, 'birthDate') && !!profile.birthDate
  //     ? new Date(profile.birthDate) : null;
  //   const iAge = _.has(profile, 'age') ? profile.age : null;
  //   const iGender = _.has(profile, 'gender') ? profile.gender : null;
  //   const iMobile = _.has(profile, 'mobile') ? profile.mobile : null;
  //   const iAddress = _.has(profile, 'address') ? profile.address : null;
  //   const iAddress1 = _.has(iAddress, 'address1') ? iAddress.address1 : null;
  //   const iAddress2 = _.has(iAddress, 'address2') ? iAddress.address2 : null;
  //   const iCity = _.has(iAddress, 'city') ? iAddress.city : null;
  //   const iPostalCode = _.has(iAddress, 'postalCode') ? iAddress.postalCode : null;
  //   const iCountryCode = _.has(iAddress, 'countryCode') ? iAddress.countryCode : null;
  //   const others = _.has(profile, 'others') ? profile.others : null;
  //   const iInterest = _.has(others, 'interest') ? others.interest : null;
  //   const guardian = _.has(others, 'guardian') ? others.guardian : null;
  //   const iGFirstName = _.has(guardian, 'firstName') ? guardian.firstName : null;
  //   const iGMiddleInitial = _.has(guardian, 'middleInitial') ? guardian.middleInitial : null;
  //   const iGLastName = _.has(guardian, 'lastName') ? guardian.lastName : null;

  //   switch (iUserStatus) {
  //     case 'FOR_APPROVAL':
  //       setStatusVariant('text-warning');
  //       setUserStatus('For Approval');
  //       break;
  //     case 'ACTIVE':
  //       setStatusVariant('text-success');
  //       setUserStatus('Active');
  //       break;
  //     case 'INACTIVE':
  //       setStatusVariant('text-danger');
  //       setUserStatus('Inactive');
  //       break;
  //     default: setStatusVariant('default');
  //   }

  //   if (iInterest) {
  //     getInterest({ variables: { uid: iInterest } }).then(({ data }) => {
  //       const interestResult = _.has(data, 'getInterest') ? data.getInterest : null;
  //       const title = _.has(interestResult, 'title') ? interestResult.title : null;

  //       setInterest(title);
  //     });
  //   }

  //   setEmail(iEmail);
  //   setFirstName(iFirstName);
  //   setMiddleInitial(iMI);
  //   setLastName(iLastName);

  //   setBirthDate(iBirthDate);
  //   setGender(iGender);
  //   setAge(iAge);
  //   setMobile(iMobile);
  //   setAddress1(iAddress1);
  //   setAddress2(iAddress2);
  //   setCity(iCity);
  //   setPostalCode(iPostalCode);
  //   setCountryCode(iCountryCode);
  //   setInterest(iInterest);

  //   setGFirstName(iGFirstName);
  //   setGMiddleInitial(iGMiddleInitial);
  //   setGLastName(iGLastName);
  // }, [userResult]);

  // const { data: filesResults } = useQuery(getUserFilesQuery, {
  //   skip: !userUid,
  //   client: RegistryClient,
  //   variables: { userUid },
  // });

  // useEffect(() => {
  //   const files = _.has(filesResults, 'getUserFiles') ? filesResults.getUserFiles : []

  //   const iStudGovPublicUrl = getFileUrl({ files, fileCategory: 'STUDENT_GOV_ID' })
  //   setStudGovId(iStudGovPublicUrl);

  //   const iStudentUrl = getFileUrl({ files, fileCategory: 'STUDENT_ID' })
  //   setStudentId(iStudentUrl);

  //   const iGuardianUrl = getFileUrl({ files, fileCategory: 'GUARDIAN_ID' })
  //   setGuardianId(iGuardianUrl);
  // }, [filesResults])

  return (
    <CustomPlaceHolder rowSet={6} loading={false}>
      <div className="card col-10 me-auto ms-auto p-0">
        <div className="card-body">
          <div className="mentor-widget">
            <div className="user-info-left align-items-center">
              <div className="mentor-img d-flex flex-wrap justify-content-center">
                <Avatar />
                <div className="mentor-details m-0">
                  <p className="user-location m-0">
                    <i className="fas fa-map-marker-alt" />
                    {' '}
                    {city}
                    ,
                    {' '}
                    {countryCode}
                  </p>
                </div>
              </div>
              <div className="user-info-cont">
                <h4 className="usr-name">
                  {firstName || ''}
                  {' '}
                  {lastName || ''}
                </h4>
                <p className="mentor-type">{roleCode}</p>
                <div className="mentor-action">
                  <p className="mentor-type social-title">
                    Status
                    {' '}
                    <span className={statusVariant}>{userStatus}</span>
                  </p>

                  {/* <a
                    href="javascript:void(0)"
                    onClick={() => { navigate('/student/profile-settings'); }}
                    className="btn-blue"
                  >
                    <i className="fas fa-edit" />
                  </a> */}
                  <Button variant="link" onClick={() => { navigate('/profile'); }}>
                    <i className="fas fa-edit" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card col-10 me-auto ms-auto p-0">
        <div className="card-body custom-border-card pb-0">
          <div className="widget education-widget mb-0">
            <h4 className="widget-title">Personal Details</h4>
            <hr />
            <div className="experience-box">
              <ul className="experience-list profile-custom-list">
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>First Name</span>
                      <div className="row-result">{firstName}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Middle Initial</span>
                      <div className="row-result">{middleInitial}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Last Name</span>
                      <div className="row-result">{lastName}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Gender</span>
                      <div className="row-result">{gender}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Date of Birth</span>
                      <div className="row-result">{birthDate && moment(birthDate).format('ll')}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Age</span>
                      <div className="row-result">{age}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Interest</span>
                      <div className="row-result">{interest}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card col-10 me-auto ms-auto p-0">
        <div className="card-body custom-border-card pb-0">

          <div className="widget education-widget mb-0">
            <h4 className="widget-title">Contact</h4>
            <hr />
            <div className="experience-box">
              <ul className="experience-list profile-custom-list">
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Email</span>
                      <div className="row-result">{email}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Mobile</span>
                      <div className="row-result">{mobile}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card col-10 me-auto ms-auto p-0">
        <div className="card-body custom-border-card pb-0">
          <div className="widget awards-widget m-0">
            <h4 className="widget-title">Location</h4>
            <hr />
            <div className="experience-box">
              <ul className="experience-list profile-custom-list">
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Address 1</span>
                      <div className="row-result">{address1}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Address 2</span>
                      <div className="row-result">{address2}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Country</span>
                      <div className="row-result">{countryCode}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>City</span>
                      <div className="row-result">{city}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Postal Code</span>
                      <div className="row-result">{postalCode}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card col-10 me-auto ms-auto p-0">
        <div className="card-body custom-border-card pb-0">
          <div className="widget education-widget mb-0">
            <h4 className="widget-title">Guardian</h4>
            <hr />
            <div className="experience-box">
              <ul className="experience-list profile-custom-list">
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>First Name</span>
                      <div className="row-result">{gFirstName}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Middle Initial</span>
                      <div className="row-result">{gMiddleInitial}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="experience-content">
                    <div className="timeline-content">
                      <span>Last Name</span>
                      <div className="row-result">{gLastName}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card col-10 me-auto ms-auto p-0">
        <div className="card-body custom-border-card pb-0">
          <div className="widget awards-widget m-0">
            <h4 className="widget-title">Files</h4>
            <hr />

            <Row gutter={[16, 32]} >
              {
                studGovId && (
                  <Col>
                    <div className="experience-content">
                      <div className="timeline-content">
                        <span>Student Government ID</span>
                        <div className="row-result">
                          <ImageViewer
                            filePath={studGovId}
                            thumbnail
                            fluid
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              }
              {
                studentId && (
                  <Col>
                    <div className="experience-content">
                      <div className="timeline-content">
                        <span>Student School ID</span>
                        <div className="row-result">
                          <ImageViewer
                            filePath={studentId}
                            thumbnail
                            fluid
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              }
              {
                guardianId && (
                  <Col>
                    <div className="experience-content">
                      <div className="timeline-content">
                        <span>Guardian ID</span>
                        <div className="row-result">
                          <ImageViewer
                            filePath={guardianId}
                            thumbnail
                            fluid
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              }
            </Row>
          </div>
        </div>
      </div>
    </CustomPlaceHolder>
  );
}
