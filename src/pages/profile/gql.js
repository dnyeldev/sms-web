/* eslint-disable import/prefer-default-export */
import { gql } from "@apollo/client";

/**
 * Query
 */

export const getUserAvatarQuery = gql`
  query getUserAvatar($userId: ID!) {
    getUserAvatar(userId: $userId) {
      id
      userId
      fileId
      file {
        id
        name
        fileSize
        filePath
        type
        encoding
        __typename
      }
      createdBy
      createdAt
      updatedBy
      updatedAt
      __typename
    }
  }
`;

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
        __typename
      }
      __typename
    }
  }
`;

/**
 * End of Query
 */

/**
 * Mutation
 */

export const UploadFileMutation = gql`
  mutation Mutate($file: File!) {
    uploadFile(file: $file) {
      id
      name
      type
      fileSize
      filePath
      createdAt
      __typename
    }
  }
`;

export const SaveAvatarMutation = gql`
  mutation Mutate($userId: ID!, $fileId: Int!) {
    saveAvatar(userId: $userId, fileId: $fileId) {
      id
      fileId
      userId
      __typename
    }
  }
`;

/**
 * End of Mutation
 */
