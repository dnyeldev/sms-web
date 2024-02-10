import { gql } from '@apollo/client'

export const GET_SECTION = gql`
  query getSection($id: ID!) {
    getSection(id: $id) {
      id
      name
      gradeLevel
      status
      adviser {
        id
        profile {
          id
          firstName
          lastName
          __typename
        }
        __typename
      }
      createdBy
      createdAt
      __typename
    }
  }
`

export const GET_SECTIONS = gql`
  query getSections {
    getSections {
      id
      name
      gradeLevel
      status
      adviser {
        id
        profile {
          id
          firstName
          lastName
          __typename
        }
        __typename
      }
      createdBy
      createdAt
      __typename
    }
  }
`

export const GET_SECTION_STUDENTS = gql`
  query GET_SECTION_STUDENTS($sectionId: Int!, $schoolYearId: Int!) {
    getSectionStudents(sectionId: $sectionId, schoolYearId: $schoolYearId) {
      id
      enrolleeId
      quarterlyGrades {
        id
        sectionSubjectId
        q1
        q2
        q3
        q4
        verdict
        createdBy
        createdAt
        updatedBy
        updatedAt
        __typename
      }
      student {
        id
        status
        profile {
          id
          firstName
          middleName
          lastName
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

export const GET_ENROLLEE = gql`
  query getEnrollee($enrolleeId: ID!) {
    getEnrollee(enrolleeId: $enrolleeId) {
      id
      schoolYearId
      gradeLevel
      student {
        id
        status
        profile {
          id
          userId
          firstName
          middleName
          lastName
          gender
          mobile
          __typename
        }
        __typename
      }
      __typename
    }
  }
`
