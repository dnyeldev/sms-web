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
        userUid
        fileCategory
        storage
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
        interest
        others
        createdAt
        createdBy
        updatedAt
        updatedBy
      }
      files {
        id
        uid
        userUid
        fileCategory
        storage
      }
      createdAt
      createdBy
      updatedAt
      updatedBy
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

export const getUserFilesQuery = gql`
  query GetUserFiles($userUid: ID!, $fileCategory: String) {
    getUserFiles(userUid: $userUid, fileCategory: $fileCategory) {
      id
      uid
      userUid
      fileCategory
      storage
      createdBy
      __typename
    }
  }
`
/**
 * Queries End
 */

/**
 * Mutations
 */

/**
 * Mutations End
 */

/**
 * Fragments
 * */

/**
 * Fragments End
 * */
