import React, { useContext, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import _ from 'lodash';
import styled from 'styled-components';
import { LoginContext } from '../pages/login';

const getUserQuery = gql`
  query GetUser($uid: ID!) {
    getUser(uid: $uid) {
      id
      uid
      avatar {
        id
        uid
        fileCategory
        storage
        __typename
      }
      userProfile {
        firstName
        lastName
      }
      __typename
    }
  }
`;

export default function Index({ noClick = false, size = 'default' }) {
  const { userUid, roleCode } = useContext(LoginContext);
  const [avatar, setAvatar] = useState(null);
  const [initial, setInitial] = useState(null);
  const [profileLink, setProfileLink] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUser({ variables: { uid: userUid } }).then(({ data }) => {
      const user = _.has(data, 'getUser') ? data.getUser : null;
      const profile = _.has(user, 'userProfile') ? user.userProfile : null;
      const firstName = _.has(profile, 'firstName') ? profile.firstName : null;
      const lastName = _.has(profile, 'lastName') ? profile.lastName : null;
      const iInitial = firstName && lastName ? `${_.toUpper(firstName.charAt(0))}${_.toUpper(lastName.charAt(0))}` : '';
      const iAvatar = _.has(user, 'avatar') ? user.avatar : null;
      const iStorage = _.has(iAvatar, 'storage') ? iAvatar.storage : null;
      const publicUrl = _.has(iStorage, 'publicUrl') ? iStorage.publicUrl : null;
      // console.log({ profile });
      setAvatar(publicUrl);
      setInitial(iInitial);
    });
  }, [userUid, getUser]);

  useEffect(() => {
    switch (roleCode) {
      case 'TUTOR': setProfileLink('/tutor/my-profile');
        break;
      default: setProfileLink('/student/my-profile');
    }
  }, [roleCode]);
  const options = {};

  if (!noClick) { Object.assign(options, { onClick: () => navigate(profileLink) }); }

  return (
    <StyledDiv className={`custom-avatar custom-avatar__${size}`}>
      <StyledSmallLink {...options}>
        {avatar ? <Image src={avatar} fluid roundedCircle /> : <span className="avatar-text">{initial}</span>}
      </StyledSmallLink>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  &.custom-avatar {
    color: #fe9445;
    background-color: rgb(254 148 69 / 20%);
    border: 3px solid #fe9445;
    font-size: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 15px;
    overflow: hidden;

    .avatar-text {
      color: #fe9445;
    }
  }

  &.custom-avatar__small {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }

  &.custom-avatar__default {
    width: 75px;
    height: 75px;
  }

  &.custom-avatar__large {
    width: 100px;
    height: 100px;
    font-size: 24px;
  }
`;

export function smallAvatar({ noClick }) {
  const { userId, roleCode } = useContext(LoginContext);
  const [avatar, setAvatar] = useState(null);
  const [initial, setInitial] = useState(null);
  const [profileLink, setProfileLink] = useState(null);
  const navigate = useNavigate();

  const [getUser] = useLazyQuery(getUserQuery, {
    client: RegistryClient,
  });

  useEffect(() => {
    getUser({ variables: { id: userId } }).then(({ data }) => {
      const user = _.has(data, 'getUser') ? data.getUser : null;
      const profile = _.has(user, 'userProfile') ? user.userProfile : null;
      const firstName = _.has(profile, 'firstName') ? profile.firstName : null;
      const lastName = _.has(profile, 'lastName') ? profile.lastName : null;
      const iInitial = firstName && lastName ? `${_.toUpper(firstName.charAt(0))}${_.toUpper(lastName.charAt(0))}` : '';
      const iAvatar = _.has(user, 'avatar') ? user.avatar : null;
      const iStorage = _.has(iAvatar, 'storage') ? iAvatar.storage : null;
      const publicUrl = _.has(iStorage, 'publicUrl') ? iStorage.publicUrl : null;

      setAvatar(publicUrl);
      setInitial(iInitial);
    });
  }, [userId, getUser]);

  useEffect(() => {
    switch (roleCode) {
      case 'TUTOR': setProfileLink('/tutor/my-profile');
        break;
      default: setProfileLink('/student/my-profile');
    }
  }, [roleCode]);

  const options = {};

  if (!noClick) { Object.assign(options, { onClick: () => navigate(profileLink) }); }

  return (
    <StyledSmallDiv>
      <StyledSmallLink {...options}>
        {avatar ? <Image src={avatar} fluid roundedCircle /> : <span className="avatar-text">{initial}</span>}
      </StyledSmallLink>
    </StyledSmallDiv>
  );
}

const StyledSmallDiv = styled.div`
    color: #FFFFFF;
    background-color: rgb(254 148 69 / 20%);
    border: 3px solid #fe9445;
    font-size: 16px;
    border-radius: 50%;
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .avatar-text {
      color: #FFFFFF;
    }
`;

const StyledSmallLink = styled.a`
  color: #FFFFFF;
`;
