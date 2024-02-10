import { gql } from '@apollo/client'

export const GET_SCHOOL_USERS = gql`
  query getAllUsers($roleCodes: [RoleCodes], $status: [UserStatus]) {
    getAllUsers(roleCodes: $roleCodes, status: $status) {
      id
      roleCode
      status
      username
      profile {
        id
        lrnNo
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
      createdAt
      __typename
    }
  }
`

export const GET_STUDENTS = gql`
  query GET_STUDENTS($status: [UserStatus]) {
    getAllStudents(status: $status) {
      id
      roleCode
      status
      username
      profile {
        id
        lrnNo
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
      createdAt
      __typename
    }
  }
`
