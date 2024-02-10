import { gql } from '@apollo/client'

export const GET_ANNOUNCEMENT = gql`
  query Query($id: ID!) {
    getAnnouncement(id: $id) {
      id
      audience
      message
      createdBy
      __typename
    }
  }
`

export const GET_ANNOUNCEMENTS = gql`
  query GET_ANNOUNCEMENTS {
    getAnnouncements {
      id
      audience
      message
      status
      createdBy
      createdAt
      __typename
    }
  }
`

export const GET_TEXT_MESSAGE = gql`
  query GET_TEXT_MESSAGE($id: ID!) {
    getTextMessage(id: $id) {
      id
      audience
      recipients
      message
      status
      createdAt
      createdBy
      __typename
    }
  }
`

export const GET_TEXT_MESSAGES = gql`
  query GET_TEXT_MESSAGES {
    getTextMessages {
      id
      audience
      recipients
      message
      status
      createdAt
      createdBy
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

export const SAVE_ANNOUNCEMENT = gql`
  mutation saveAnnouncement(
    $id: ID
    $audience: [RoleCodes!]!
    $message: String!
  ) {
    saveAnnouncement(id: $id, audience: $audience, message: $message) {
      id
      audience
      message
      createdBy
      createdAt
      __typename
    }
  }
`

export const SMS_BROADCAST = gql`
  mutation smsBroadcast($audience: [RoleCodes], $message: String!) {
    smsBroadcast(audience: $audience, message: $message) {
      id
      audience
      recipients
      message
      status
      createdAt
      createdBy
      __typename
    }
  }
`
