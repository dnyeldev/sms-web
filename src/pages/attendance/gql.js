/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * Query
 */

export const getMonthlyAttendanceQuery = gql`
  query GetMonthlyAttendance($instanceUid: String! $searchDate: String!) {
    getMonthlyAttendance(instanceUid: $instanceUid searchDate: $searchDate) {
      id
      uid
      sessionUid
      instanceUid
      status
      startedAt
      endedAt
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;

/**
 * End of Query
 */

/**
 * Mutation
 */
// export const endSessionMutation = gql`
//   mutation EndSession(
//     $sessionUid: ID!
//     $instanceUid: String!
//     $privateNoteText: String
//     $sharedNoteText: String
//   ) {
//     endSession(
//       sessionUid: $sessionUid
//       instanceUid: $instanceUid
//       privateNoteText: $privateNoteText
//       sharedNoteText: $sharedNoteText
//     ) {
//       id
//       uid
//       timeslotUid
//       startDate
//       endDate
//       link
//       status
//       createdAt
//       createdBy
//       updatedAt
//       updatedBy
//       __typename
//     }
//   }
// `;

/**
 * End of Mutation
 */
