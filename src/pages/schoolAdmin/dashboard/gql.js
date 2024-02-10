import { gql } from '@apollo/client';

export const GET_USER_ROLE_COUNT = gql`
    query GetUserRolesCount($roles: [String]) {
        getUserRolesCount(roles: $roles)
    }
`;

export const GET_TOP_TUTORS_RATING = gql`
query GetTopTutorsRating($limit: Int,  $dateRange: DateRangeInput $sortOrder: String) {
    getTopTutorsRating(limit: $limit dateRange: $dateRange sortOrder: $sortOrder) {
      tutor {
        id
        uid
        userUid
        status
        others
        priceRange
        rating
        createdAt
        createdBy
        updatedAt
        updatedBy
      }
      averageRating
    }
  }
`;

export const GET_TOP_STUDENTS_RATING = gql`
query GetTopStudentsRating($dateRange: DateRangeInput, $limit: Int) {
    getTopStudentsRating(dateRange: $dateRange, limit: $limit) {
      tutee {
        id
        uid
        userUid
        status
        others
        createdAt
        createdBy
        updatedAt
        updatedBy
      }
      averageRating
    }
  }
`;

export const GET_MONTHLY_EARNING = gql`
query Query($monthYear: String!) {
    getMonthlyEarnings(monthYear: $monthYear)
  }
`;

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