/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

/**
 * Query
 */
export const getEnrollee = gql`
  query getEnrolee
`

/**
 * End of Query
 */

/**
 * Mutation
 */

export const registerUserMutation = gql`
  mutation RegisterUser(
    $firstName: String!
    $middleInitial: String
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
    $agreedPolicyTerms: Boolean!
    $roleCode: String!
    $mobile: String
    $birthDate: String
    $gender: String
    $address: JSON
    $others: JSON
  ) {
    registerUser(
      firstName: $firstName
      middleInitial: $middleInitial
      lastName: $lastName
      email: $email
      username: $username
      password: $password
      agreedPolicyTerms: $agreedPolicyTerms
      roleCode: $roleCode
      mobile: $mobile
      birthDate: $birthDate
      gender: $gender
      address: $address
      others: $others
    ) {
      id
      uid
      username
      email
      roleCode
      agreedPolicyTerm
      status
      createdAt
      createdBy
      updatedAt
      updatedBy
      verificationLink
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
    }
  }
`;

/**
 * End of Mutation
 */
