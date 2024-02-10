import { gql } from '@apollo/client';

export const GET_SCHOOL_USERS = gql`
    query getAllUsers($roleCodes: [RoleCodes]) {
      getAllUsers(roleCodes: $roleCodes) {
        id
        roleCode
        status
        username
        profile {
          id
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
        }
      }
    }
`;
