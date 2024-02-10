import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query GetAllUsers($offset: Int, $limit: Int, $searchText: String, $filter: UserFilter, $exceptRoles: [String]) {
        getAllUsers(offset: $offset, limit: $limit, searchText: $searchText, filter: $filter, exceptRoles: $exceptRoles) {
        count
        rows {
            id
            uid
            username
            email
            roleCode
            agreedPolicyTerm
            status
            userProfile {
            id
            uid
            userUid
            firstName
            middleInitial
            lastName
            age
            mobile
            birthDate
            gender
            address
            status
            createdAt
            createdBy
            updatedAt
            updatedBy
            }
            avatar {
              id
              uid
              userUid
              fileCategory
              storage
            }
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
        }
    }
`;

export const CREATE_USER = gql`
mutation CreateUser($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!, $roleCode: String!, $merchantName: String $createdBy: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password, roleCode: $roleCode, merchantName: $merchantName createdBy: $createdBy) {
      id
      uid
      username
      email
      roleCode
      agreedPolicyTerm
      userProfile {
        id
        uid
        userUid
        firstName
        middleInitial
        lastName
        age
        mobile
        birthDate
        gender
        address
        status
        createdAt
        createdBy
        updatedAt
        updatedBy
      }
      avatar {
        id
        uid
        userUid
        fileCategory
        storage
      }
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;

export const DELETE_USER = gql`
    mutation Mutation($userUid: String!, $deletedBy: String!) {
        deleteUser(userUid: $userUid, deletedBy: $deletedBy)
    }  
`;
