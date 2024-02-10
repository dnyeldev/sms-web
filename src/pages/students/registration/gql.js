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

export const registerStudentMutation = gql`
  mutation registerStudent($user: InputUser!) {
    registerStudent(user: $user) {
      id
      username
      status
    }
  }
`;

/**
 * End of Mutation
 */
