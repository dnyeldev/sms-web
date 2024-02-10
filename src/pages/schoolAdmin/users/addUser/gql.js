/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * Query
 */


/**
 * End of Query
 */

/**
 * Mutation
 */

export const createUserMutation = gql`
    mutation createUser($user: InputUser!) {
      createUser(user: $user) {
        id
        roleCode
        status
        username
        profile {
          id
          userId
          firstName
          middleName
          lastName
          gender
          email
          mobile
          lrnNo
          guardian
          userId
          parents
          __typename
        }
        __typename
      }
    }
`;

/**
 * End of Mutation
 */
