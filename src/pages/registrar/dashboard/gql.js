import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query getAllUsers($roleCodes: [RoleCodes], $status: [UserStatus]) {
    getAllUsers(roleCodes: $roleCodes, status: $status) {
      id
      roleCode
      status
      profile {
        id
        gender
        firstName
        __typename
      }
      __typename
    }
  }
`

export const GET_MONTHLY_EARNING = gql`
  query Query($monthYear: String!) {
    getMonthlyEarnings(monthYear: $monthYear)
  }
`

export const GET_ANNOUNCEMENTS = gql`
  query getTopAnnouncements {
    getTopAnnouncements {
      id
      audience
      message
      status
      createdBy
      createdAt
      __typename
    }
  }
`
