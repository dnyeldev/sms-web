import { gql } from '@apollo/client'

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

export const GET_ENROLLEE = gql`
  query GET_ENROLLEE($enrolleeId: ID!) {
    getEnrollee(enrolleeId: $enrolleeId) {
      id
      userId
      schoolYearId
      gradeLevel
      paymentType
      status
      createdBy
      createdAt
      files {
        id
        name
        type
        fileSize
        filePath
        __typename
      }
      student {
        id
        status
        profile {
          id
          firstName
          lastName
          gender
          lrnNo
          __typename
        }
        __typename
      }
      sectionStudent {
        id
        sectionId
        section {
          id
          name
          __typename
        }
        __typename
      }
      payments {
        id
        type
        amount
        paymentType
        status
        others
        createdAt
        createdBy
        __typename
      }
      __typename
    }
  }
`

export const GET_ENROLLEES_QUERY = gql`
  query GET_ENROLLEES {
    getEnrollees {
      id
      userId
      schoolYearId
      gradeLevel
      createdBy
      createdAt
      files {
        id
        name
        type
        fileSize
        filePath
        __typename
      }
      student {
        id
        status
        profile {
          id
          firstName
          lastName
          gender
          lrnNo
          __typename
        }
        __typename
      }
      sectionStudent {
        id
        sectionId
        section {
          id
          name
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

export const getUser = gql`
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
        __typename
      }
      __typename
    }
  }
`

export const GET_UNENROLLED_QUERY = gql`
  query {
    getUnenrolledStudents {
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
  }
`

export const ENROLL_STUDENT_MUTATION = gql`
  mutation ENROLL_STUDENT_MUTATION(
    $studentId: ID!
    $schoolYearId: Int!
    $gradeLevel: GradeLevels!
    $paymentType: PaymentType
    $amount: Float!
    $files: File!
    $others: JSON
  ) {
    enrollStudent(
      studentId: $studentId
      schoolYearId: $schoolYearId
      gradeLevel: $gradeLevel
      paymentType: $paymentType
      amount: $amount
      files: $files
      others: $others
    ) {
      id
      profile {
        id
        firstName
        lastName
        __typename
      }
      enrollment {
        id
        userId
        schoolYearId
        gradeLevel
        createdBy
        createdAt
        files {
          id
          name
          type
          fileSize
          filePath
          __typename
        }
        payments {
          id
          type
          amount
          paymentType
          status
          createdAt
          createdBy
          __typename
        }
        __typename
      }
      __typename
    }
  }
`

export const PAY_STUDENT = gql`
  mutation PAY_STUDENT(
    $referenceId: ID!
    $others: JSON
    $amount: Float!
    $files: File!
  ) {
    payStudent(
      referenceId: $referenceId
      others: $others
      amount: $amount
      files: $files
    ) {
      id
      type
      referenceId
      amount
      paymentType
      status
      createdAt
      createdBy
      __typename
    }
  }
`

export const SAVE_STUDENT_LRN = gql`
  mutation SAVE_STUDENT_LRN($userId: ID!, $lrnNo: String!) {
    saveStudentLrn(userId: $userId, lrnNo: $lrnNo) {
      id
      userId
      lrnNo
      firstName
      lastName
      __typename
    }
  }
`
