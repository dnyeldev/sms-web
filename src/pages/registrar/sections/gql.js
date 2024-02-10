import { gql } from '@apollo/client'

export const GET_SECTION = gql`
  query getSection($id: ID!) {
    getSection(id: $id) {
      id
      name
      gradeLevel
      status
      createdBy
      createdAt
      adviser {
        id
        profile {
          id
          userId
          firstName
          middleName
          lastName
          gender
          email
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

export const GET_SECTIONS = gql`
  query GET_SECTIONS {
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

export const GET_SECTION_STUDENTS = gql`
  query GET_SECTION_STUDENTS($sectionId: Int!, $schoolYearId: Int!) {
    getSectionStudents(sectionId: $sectionId, schoolYearId: $schoolYearId) {
      id
      enrolleeId
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

export const ADD_SECTION_ADVISER = gql`
  mutation addSectionAdviser(
    $sectionId: String!
    $teacherId: String!
    $schoolYearId: String!
    $createdBy: Int
  ) {
    addSectionAdviser(
      sectionId: $sectionId
      teacherId: $teacherId
      schoolYearId: $schoolYearId
      createdBy: $createdBy
    ) {
      id
      section {
        id
        name
        gradeLevel
        status
        createdBy
        createdAt
        __typename
      }
      adviser {
        id
        profile {
          id
          userId
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
        __typename
      }
      createdBy
      createdAt
      __typename
    }
  }
`

export const ADD_SECTION_STUDENT = gql`
  mutation Mutation(
    $sectionId: String!
    $enrolleeId: String!
    $schoolYearId: String!
    $createdBy: Int
  ) {
    addSectionStudent(
      sectionId: $sectionId
      enrolleeId: $enrolleeId
      schoolYearId: $schoolYearId
      createdBy: $createdBy
    ) {
      profile {
        id
        userId
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
      enrollment {
        id
        __typename
      }
      __typename
    }
  }
`

export const ADD_SECTION_SUBJECT = gql`
  mutation ADD_SECTION_SUBJECT(
    $sectionId: Int!
    $subjectId: Int!
    $teacherId: Int!
    $schoolYearId: Int!
  ) {
    addSectionSubject(
      sectionId: $sectionId
      subjectId: $subjectId
      teacherId: $teacherId
      schoolYearId: $schoolYearId
    ) {
      id
      sectionId
      subjectId
      teacherId
      schoolYearId
      __typename
    }
  }
`

export const CREATE_SECTION = gql`
  mutation createSection(
    $name: String!
    $gradeLevel: GradeLevels
    $createdBy: Int
  ) {
    createSection(name: $name, gradeLevel: $gradeLevel, createdBy: $createdBy) {
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

export const CHANGE_SECTION_STATUS_MUTATION = gql`
  mutation Mutation($id: ID!, $status: SectionStatus!, $updatedBy: Int) {
    changeSectionStatus(id: $id, status: $status, updatedBy: $updatedBy) {
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
