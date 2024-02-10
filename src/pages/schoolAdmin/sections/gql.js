import { gql } from '@apollo/client';

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
            mobile
            lrnNo
            guardian
            userId
            parents
            __typename
          }
          __typename
        }
        __typename
      }
    }
`;

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
`;



export const ADD_SECTION_ADVISER = gql`
  mutation addSectionAdviser($sectionId: String! $teacherId: String! $schoolYearId: String! $createdBy: Int){
    addSectionAdviser(sectionId: $sectionId teacherId: $teacherId schoolYearId: $schoolYearId createdBy: $createdBy){
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

export const CREATE_SECTION = gql`
  mutation createSection($name: String! $gradeLevel: GradeLevels $createdBy: Int){
    createSection(name: $name gradeLevel: $gradeLevel createdBy: $createdBy){
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
  mutation Mutation($id: ID! $status: SectionStatus! $updatedBy: Int) {
    changeSectionStatus(id: $id status: $status updatedBy: $updatedBy){
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