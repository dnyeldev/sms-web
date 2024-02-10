import { gql } from '@apollo/client';

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
`;

export const GET_SUBJECTS = gql`
    query getSubjects {
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
`;

export const CREATE_SUBJECT = gql`
  mutation createSubject(
    $name: String! 
    $gradeLevel: GradeLevels! 
    $category: SubjectCategory! 
    $createdBy: Int)
  {
    createSubject(
      name: $name 
      gradeLevel: $gradeLevel 
      category: $category 
      createdBy: $createdBy
    ){
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
  mutation Mutation($id: ID! $status: SectionStatus! $updatedBy: Int) {
    changeSectionStatus(id: $id status: $status updatedBy: $updatedBy){
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