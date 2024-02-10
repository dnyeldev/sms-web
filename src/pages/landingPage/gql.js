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
        address
        __typename
      }
      __typename
    }
  }
`;

export const elasticSearchQuery = gql`
  query ElasticSearch($type: String!, $offset: Int!, $filters: [JSON!]) {
    elasticSearch(type: $type, offset: $offset, filters: $filters) {
      count
      rows {
        id
        uid
        type
        referenceUid
        document
      }
    }
  }
`;

export const getLearningPathsMutation = gql`
  query GetLearningPaths {
    getLearningPaths {
      id
      uid
      title
      description
      status
      participantsLimit
      tutorsCount
    }
  }
`;
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
