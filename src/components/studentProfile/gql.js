/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * Query
 */
export const getUserQuery = gql`
  query Query($id: ID!) {
    getUser(id: $id){
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
        email
        mobile
        birthDay
        address
        __typename
      }
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

export const changeUserStatusMutation = gql`
  mutation Mutate($id: ID! $status: UserStatus!) {
    changeUserStatus(id: $id status: $status){
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
        email
        mobile
        birthDay
        address
        __typename
      }
      __typename
    }
  }
`;

/**
 * End of Mutation
 */
