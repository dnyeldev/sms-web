/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * Query
 */

export const getStudentLiveSessionQuery = gql`
  query GetStudentLiveSession($instanceUid: ID!) {
    getStudentLiveSession(instanceUid: $instanceUid) {
      id
      uid
      timeslotUid
      startDate
      endDate
      status
      link
      canStart
      canJoin
      interest
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;

export const getStudentUpcomingQuery = gql`
  query GetStudentUpcomingSession($instanceUid: ID!) {
    getStudentUpcomingSession(instanceUid: $instanceUid) {
      id
      uid
      timeslotUid
      startDate
      endDate
      status
      link
      canStart
      canJoin
      interest
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;

export const getTopFiveQuery = gql`
  query GetTopFive {
    getTopFive {
      id
      uid
      referenceUid
      type
      document
    }
  }
`

export const GET_ANNOUNCEMENTS = gql`
  query getTopAnnouncements {
    getTopAnnouncements {
      id
      audience
      message
      status
      createdBy
      createdAt
      __typename
    }
  }
`

/**
 * End of Query
 */

/**
 * Mutation
 */

/**
 * End of Mutation
 */

