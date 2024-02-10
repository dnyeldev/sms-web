/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * Query
 */
export const getSessionQuery = gql`
  query GetSession($uid: ID!) {
    getSession(uid: $uid) {
      id
      uid
      timeslot {
        tutorialProfile {
          tutorUid
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

export const isFavoriteTutorQuery = gql`
  query IsFavoriteTutor($tutorUid: String!, $tuteeUid: String!) {
    isFavoriteTutor(tutorUid: $tutorUid, tuteeUid: $tuteeUid)
  }
`
/**
 * End of Query
 */

/**
 * Mutation
 */
export const addReviewMutation = gql`
 mutation AddReview(
   $userUid: String!
   $sessionUid: String!
   $review: String!
   $ratings: Int!
   $favorite: Boolean
   $document: JSON
 ) {
   addReview(
     userUid: $userUid
     sessionUid: $sessionUid
     review: $review
     ratings: $ratings
     favorite: $favorite
     document: $document
   ) {
     id
     uid
     sessionUid
     tutorUid
     review
     ratings
     document

     createdAt
     createdBy
     updatedAt
     updatedBy
     __typename
   }
 }
`;
/**
 * End of Mutation
 */
