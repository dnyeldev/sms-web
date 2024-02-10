import { gql } from '@apollo/client'

export const GET_QUARTERLY_GRADE = gql`
  query getQuarterlyGrade($id: ID!) {
    getQuarterlyGrade(id: $id) {
      id
      q1
      q2
      q3
      q4
      verdict
      __typename
    }
  }
`

export const GET_SCHOOL_USERS = gql`
  query getAllUsers($roleCodes: [RoleCodes]) {
    getAllUsers(roleCodes: $roleCodes) {
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
      }
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

export const GET_SECTION_SUBJECTS = gql`
  query GET_SECTION_SUBJECTS($sectionId: Int!, $schoolYearId: Int!) {
    getSectionSubjects(sectionId: $sectionId, schoolYearId: $schoolYearId) {
      id
      sectionId
      subjectId
      createdAt
      subject {
        id
        name
        __typename
      }
      section {
        id
        name
        __typename
      }
      teacher {
        id
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

export const getUserQuery = gql`
  query Query($id: ID!) {
    getUser(id: $id) {
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
        gender
        __typename
      }
      __typename
    }
  }
`

export const saveGrades = gql`
  mutation saveQuarterlyGrades(
    $sectionSubjectId: Int!
    $schoolYearId: Int!
    $enrolleeId: Int!
    $q1: Float
    $q2: Float
    $q3: Float
    $q4: Float
    $verdict: GRADE_VERDICT
  ) {
    saveSubjectQuarterlyGrades(
      sectionSubjectId: $sectionSubjectId
      schoolYearId: $schoolYearId
      enrolleeId: $enrolleeId
      q1: $q1
      q2: $q2
      q3: $q3
      q4: $q4
      verdict: $verdict
    ) {
      id
      sectionSubjectId
      schoolYearId
      enrolleeId
      q1
      q2
      q3
      q4
      verdict
      createdBy
      createdAt
      updatedBy
      createdAt
      __typename
    }
  }
`
