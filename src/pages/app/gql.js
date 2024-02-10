/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

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
        createdAt
        createdBy
        updatedAt
        updatedBy
      }
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`

export const getUserEnrollment = gql`
  query getUserEnrollment($userId: Int!, $schoolYearId: Int!) {
    getUserEnrollment(userId: $userId, schoolYearId: $schoolYearId) {
      id
      schoolYearId
      gradeLevel
      student {
        id
        profile {
          id
          firstName
          middleName
          lastName
          __typename
        }
      }
      section {
        id
        name
        __typename
      }
      createdBy
      createdAt
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
