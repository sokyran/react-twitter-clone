import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  mutation signIn($usertag: String!, $password: String!) {
    signIn(userLoginInput: { usertag: $usertag, password: $password }) {
      access_token
      username
      usertag
      avatar
    }
  }
`

export const SIGN_UP = gql`
  mutation signUp(
    $usertag: String!
    $username: String!
    $password: String!
    $avatar: String
  ) {
    signUp(
      userInfoInput: {
        usertag: $usertag
        username: $username
        password: $password
        avatar: $avatar
      }
    ) {
      username
      usertag
      avatar
    }
  }
`

export const CREATE_TWEET = gql`
  mutation createTweet($text: String!, $imageUrl: String) {
    createTweet(createTweetInput: { text: $text, imageUrl: $imageUrl }) {
      id
      text
      imageUrl
      user {
        username
      }
    }
  }
`

export const GET_TWEETS = gql`
  query getTweets {
    tweets {
      id
      text
      date
      userId
      imageUrl
      user {
        username
        usertag
        avatar
      }
    }
  }
`
