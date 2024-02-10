/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * Query
 */
export const getSessionsQuery = gql`
  query GetAllUserSessions($instanceUid: String! $roleCode: String! $searchUid: String) {
    getAllUserSessions(instanceUid: $instanceUid roleCode: $roleCode searchUid: $searchUid) {
      id
      uid
      timeslotUid
      startDate
      endDate
      status
      interest
      createdAt
      createdBy
      updatedAt
      updatedBy
      timeslot {
        id
        uid
        tutorialProfile {
          id
          uid
          sessionType
          price
          tutor {
            uid
            userUid
            others
          }
        }
      }
      enrollees {
        id
        uid
        tuteeUid
        status
        tutee {
          id
          uid
          others
          userUid
        }
      }
      canResched
      canCancel
    }
  }
`;

export const getCalendarLastSyncDateQuery = gql`
  query GetCalendarLastSyncDate($userUid: String!) {
    getCalendarLastSyncDate(userUid: $userUid) {
      id
      uid
      userUid
      document
      createdAt
      createdBy
      updatedAt
      updatedBy
      __typename
    }
  }
`;

export const getOAuthTokenQuery = gql`
  query GetOAuthToken($userUid: String! $oauthCode: String) {
    getOAuthToken(userUid: $userUid oauthCode: $oauthCode) {
      id
      uid
      userUid
      type
      token
    }
  }
`

export const getOAuthUrlQuery = gql`
  query GetOAuthUrl { getOAuthUrl }
`
/**
 * End of Query
 */

/**
 * Mutation
 */
export const cancelBookingMutation = gql`
  mutation CancelBooking(
    $sessionUid: String!
    $tuteeUid: String!
    $updatedBy: String!
  ) {
    cancelBooking(
      sessionUid: $sessionUid
      tuteeUid: $tuteeUid
      updatedBy: $updatedBy
    ) {
      id
      uid
      status
      __typename
    }
  }
`;

export const cancelTutorSessionMutation = gql`
  mutation CancelTutorSession(
    $sessionUid: String!
    $tutorUid: String!
    $updatedBy: String!
  ) {
    cancelTutorSession(
      sessionUid: $sessionUid
      tutorUid: $tutorUid
      updatedBy: $updatedBy
    ) 
  }
`;

export const CalendarSyncMutation = gql`
  mutation SyncCalendar($userUid: String! $token: JSON) {
    syncCalendar(userUid: $userUid token: $token) {
      id
      uid
      userUid
      document
      createdAt
      createdBy
      updatedAt
      updatedBy
      __typename
    }
  }
`

export const verifyOauthTokenMutation = gql`
  mutation VerifyOauthToken($userUid: String!) {
    verifyOauthToken(userUid: $userUid)
  }
`
/**
 * End of Mutation
 */
