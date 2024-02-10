import React, { useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import _ from "lodash";
import styled from "styled-components";
import { getUserAvatarQuery } from "../pages/profile/gql";

const StyledDiv = styled.div`
  &.custom-avatar {
    color: #fe9445;
    background-color: rgb(254 148 69 / 20%);
    border: 3px solid #fe9445;
    font-size: 24px;
    border-radius: 50%;
    display: inline-flex;
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

export default function Index(payload) {
  const {
    userId,
    roleCode,
    noClick = false,
    size = "default",
    className,
  } = payload;
  const [avatar, setAvatar] = useState(null);
  const [initial, setInitial] = useState(null);
  const [profileLink, setProfileLink] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    switch (roleCode) {
      case "TUTOR":
        setProfileLink("/tutor/my-profile");
        break;
      default:
        setProfileLink("/student/my-profile");
    }
  }, [roleCode]);
  const options = {};

  if (!noClick) {
    Object.assign(options, { onClick: () => navigate(profileLink) });
  }

  const { data: userAvatarResult, loading: loadingAvatar } = useQuery(
    getUserAvatarQuery,
    {
      skip: !userId,
      variables: { userId },
    }
  );

  useEffect(() => {
    const userAvatar = _.has(userAvatarResult, "getUserAvatar")
      ? userAvatarResult.getUserAvatar
      : null;
    const file = _.has(userAvatar, "file") ? userAvatar.file : null;
    const path = _.has(file, "filePath") ? file.filePath : null;

    setAvatar(path);
  }, [userAvatarResult, setAvatar]);

  return (
    <StyledDiv className={`custom-avatar custom-avatar__${size} ${className}`}>
      <StyledSmallLink {...options}>
        {avatar ? (
          <Image src={avatar} fluid roundedCircle />
        ) : (
          <span className="avatar-text">{initial}</span>
        )}
      </StyledSmallLink>
    </StyledDiv>
  );
}

const StyledSmallLink = styled.a`
  color: #ffffff;
`;
