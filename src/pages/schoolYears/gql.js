import { gql } from '@apollo/client'

export const GET_SCHOOL_YEAR = gql`
  query getSchoolYear($id: ID!) {
    getSchoolYear(id: $id) {
      id
      name
      startDate
      endDate
      status
      createdBy
      createdAt
      __typename
    }
  }
`

export const GET_SCHOOL_YEARS = gql`
  query GET_SCHOOL_YEARS {
    getSchoolYears {
      id
      name
      startDate
      endDate
      status
      createdBy
      createdAt
      __typename
    }
  }
`

export const CREATE_SY = gql`
  mutation createSchoolYear(
    $name: String!
    $startDate: String!
    $endDate: String!
  ) {
    createSchoolYear(name: $name, startDate: $startDate, endDate: $endDate) {
      id
      name
      startDate
      endDate
      status
      createdBy
      createdAt
      __typename
    }
  }
`

export const CHANGE_SY_STATUS_MUTATION = gql`
  mutation Mutation($id: ID!, $status: SchoolYearStatus!, $updatedBy: Int) {
    changeSchoolYearStatus(id: $id, status: $status, updatedBy: $updatedBy) {
      id
      name
      startDate
      endDate
      status
      createdBy
      createdAt
      __typename
    }
  }
`
