/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * Queries
 */
export const getUserTutorDetailsQuery = gql`
  query GetUserTutorDetails($userUid: ID!) {
    getUserTutorDetails(userUid: $userUid) {
      id
      uid
      userUid
      status
      others
      __typename
    }
  }
`;

export const getUserTuteeDetailsQuery = gql`
  query GetUserTuteeDetails($userUid: ID!) {
    getUserTuteeDetails(userUid: $userUid) {
      id
      uid
      userUid
      status
      others
      __typename
    }
  }
`;

export const getResetPasswordQuery = gql`
  query GetResetPassword($uid: ID!) {
    getResetPassword(uid: $uid) {
      id
      uid
      userUid
      currentPassword
      newPassword
      status
      createdAt
      createdBy
      updatedAt
      updatedBy
      __typename
    }
  }
`;

export const getUserInstanceQuery = gql`
  query GetUserInstance($userUid: ID!) {
    getUserInstance(userUid: $userUid) {
      ... on Tutor {
        id
        uid
        userUid
        status
        others
        priceRange
        rating
        __typename
      }
      ... on Tutee {
        id
        uid
        userUid
        status
        others
        __typename
      }
    }
  }
`;
/**
 * Queries End
 */

/**
 * Mutations
 */
export const validateUser = gql`
  mutation ValidateUser($username: String!, $password: String!) {
    validateUser(username: $username, password: $password) {
      token
      user {
        id
        uid
        username
        email
        roleCode
        agreedPolicyTerm
        status
        emailSent
        requireGradelevelUpdate
        userProfile {
          id
          uid
          userUid
          firstName
          middleInitial
          lastName
          age
          mobile
          birthDate
          gender
          address
          status
          createdAt
          createdBy
          updatedAt
          updatedBy
          __typename
        }
        createdAt
        createdBy
        updatedAt
        updatedBy
        __typename
      }
    }
  }
`;

export const createResetPasswordMutation = gql`
  mutation Mutation($email: String!) {
    createResetPassword(email: $email) {
      id
      uid
      userUid
      currentPassword
      newPassword
      status
      createdAt
      createdBy
      updatedAt
      updatedBy
      __typename
    }
  }
`;

export const sendSystemEmailMutation = gql`
  mutation SendSystemEmail($to: String!, $subject: String!, $text: String, $html: String) {
    sendSystemEmail(to: $to, subject: $subject, text: $text, html: $html)
  }
`;

export const resetPasswordMutation = gql`
  mutation Mutation($uid: ID!, $password: String!) {
    resetPassword(uid: $uid, password: $password) {
      id
      uid
      userUid
      currentPassword
      newPassword
      status
      createdAt
      createdBy
      updatedAt
      updatedBy
      __typename
    }
  }
`;

export const verificationEmailSentMutation = gql`
  mutation VerificationEmailSent($userUid: ID!) {
    verificationEmailSent(userUid: $userUid) {
      id
      uid
      username
      email
      roleCode
      agreedPolicyTerm
      status
      emailSent
      __typename
    }
  }
`;

export const sendNotificationMutation = gql`
    mutation SendNotification($users: [String]! $data: JSON $title: String! $message: String! $createdBy: String!) {
        sendNotification(users: $users data: $data title: $title message: $message createdBy: $createdBy) {
            id
            uid
            title
            message
            userUid
            seenAt
            createdAt
            createdBy
            updatedAt
            updatedBy
            data
            __typename
        }
    }
`;

export const updateTutorElasticSearchMutation = gql`
  mutation UpdateTutorElasticSearch($tutorUserUid: String!) {
    updateTutorElasticSearch(tutorUserUid: $tutorUserUid) {
      id
      uid
      referenceUid
      type
      document
      __typename
    }
  }
  `;
/**
 * Mutations End
 */

/**
 * Fragments
 * */

/**
 * Fragments End
 * */
