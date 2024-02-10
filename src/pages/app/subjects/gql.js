import { gql } from '@apollo/client'

export const GET_SUBJECT = gql`
  query getSubject($id: ID!) {
    getSubject(id: $id) {
      id
      name
      gradeLevel
      category
      createdBy
      createdAt
      __typename
    }
  }
`

export const GET_SUBJECTS = gql`
  query GET_SUBJECTS {
    getSubjects {
      id
      name
      gradeLevel
      category
      createdBy
      createdAt
      __typename
    }
  }
`

export const GET_SUBJECT_TEACHERS = gql`
  query GET_SUBJECT_TEACHERS($subjectId: ID!) {
    getSubjectTeachers(subjectId: $subjectId) {
      id
      subjectId
      teacherId
      user {
        id
        username
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

export const CREATE_SUBJECT = gql`
  mutation createSubject(
    $name: String!
    $gradeLevel: GradeLevels!
    $category: SubjectCategory!
    $createdBy: Int
  ) {
    createSubject(
      name: $name
      gradeLevel: $gradeLevel
      category: $category
      createdBy: $createdBy
    ) {
      id
      name
      gradeLevel
      category
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
      category
      createdBy
      createdAt
      __typename
    }
  }
`

export const ADD_SUBJECT_TEACHER = gql`
  mutation AddSubjectTeacher($subjectId: ID!, $userId: Int!) {
    addSubjectTeacher(subjectId: $subjectId, userId: $userId) {
      id
      subjectId
      teacherId
      user {
        id
        username
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
