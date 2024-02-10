/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * Queries
 */

export const getUserQuery = gql`
  query GetUser($uid: ID!) {
    getUser(uid: $uid) {
      id
      uid
      email
      status
      avatar {
        id
        uid
        fileCategory
        storage
        __typename
      }
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
        others
        interest
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
`;

export const getInterestQuery = gql`
  query GetInterest($uid: ID!) {
    getInterest(uid: $uid) {
      id
      uid
      title
      description
      status
    }
  }
`;

export const getUserWalletQuery = gql`
  query GetUserWallet($userUid: ID!) {
    getUserWallet(userUid: $userUid) {
      id
      uid
      userUid
      balance
      __typename
    }
  }
`;
/**
 * Queries End
 */

/**
 * Mutations
 */
export const saveProfileMutation = gql`
  mutation SaveProfile(
    $userUid: String!
    $firstName: String
    $middleInitial: String
    $lastName: String
    $mobile: String
    $birthDate: String
    $gender: String
    $address: JSON
    $others: JSON
    $updatedBy: String!
    ) {
      saveProfile(
      userUid: $userUid
      firstName: $firstName
      middleInitial: $middleInitial
      lastName: $lastName
      mobile: $mobile
      birthDate: $birthDate
      gender: $gender
      address: $address
      others: $others
      updatedBy: $updatedBy
    ) {
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
    }
  }
`;

export const changePasswordMutation = gql`
  mutation Mutation(
    $userUid: String!
    $currentPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      userUid: $userUid
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      id
      uid
      email
      status
    }
  }
`;

export const deleteRegisteredUserMutation = gql`
  mutation Mutation(
    $userUid: String! 
  ) {
    deleteRegisteredUser(
      userUid: $userUid
    )
  }
`;

export const deleteTuteeMutation = gql`
  mutation Mutation(
    $uid: ID!
    $deletedBy: String! 
  ) {
    deleteTutee(
      uid: $uid
      deletedBy: $deletedBy
    )
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
