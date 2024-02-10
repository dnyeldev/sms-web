/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * Query
 */
export const getTutorialProfilesQuery = gql`
  query GetTutorialProfiles($tutorUid: ID!) {
    getTutorialProfiles(tutorUid: $tutorUid) {
      id
      uid
      interest
      sessionType
      price
      status
      timeslots {
        id
        uid
        tutorialProfileUid
        day
        start
        end
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
`;
/**
 * End of Query
 */

/**
 * Mutation
 */

export const addTutorialProfileQuery = gql`
  mutation AddTutorialProfile(
    $interest: String!
    $sessionType: String!
    $price: Float!
    $instanceUid: String!
    $createdBy: String!
  ) {
    addTutorialProfile(
      interest: $interest
      sessionType: $sessionType
      price: $price
      instanceUid: $instanceUid
      createdBy: $createdBy
    ) {
      id
      uid
      userUid
      interest
      sessionType
      price
      status
    }
  }
`;

export const deleteTutorialProfileMutation = gql`
  mutation DeleteTutorialProfile(
    $uid: ID!
    $deletedBy: String!
  ) {
    deleteTutorialProfile(
      uid: $uid
      deletedBy: $deletedBy
    )
  }
`;

/**
 * End of Mutation
 */
