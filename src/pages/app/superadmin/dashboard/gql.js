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
