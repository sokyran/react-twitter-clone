import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  mutation signIn($usertag: String!, $password: String!) {
    signIn(userLoginInput: { usertag: $usertag, password: $password }) {
      accessToken
      username
      usertag
      avatar
      id
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
      likes
      imageUrl
      commentCount
      user {
        username
        usertag
        avatar
      }
    }
  }
`

export const GET_TWEET_BY_ID = gql`
  query getTweet($id: Int!) {
    tweet(id: $id, loadComments: true) {
      text
      date
      id
      commentCount
      likes
      user {
        username
        usertag
        avatar
      }
      comments {
        id
        text
        date
        likes
        inResponseTo
        user {
          username
          usertag
          avatar
        }
        comments {
          id
        }
      }
    }
  }
`

export const LIKE_TWEET = gql`
  mutation likeTweet($id: Int!) {
    likeTweet(id: $id) {
      likes
      id
    }
  }
`

export const UNLIKE_TWEET = gql`
  mutation unlikeTweet($id: Int!) {
    unlikeTweet(id: $id) {
      likes
      id
    }
  }
`

export const SHOW_LIKES = gql`
  query showLikes($id: Int) {
    showLikes(id: $id)
  }
`

export const CREATE_COMMENT = gql`
  mutation createComment($text: String!, $parentTweetId: Int!) {
    createComment(
      createCommentInput: { text: $text, parentTweetId: $parentTweetId }
    ) {
      id
      text
      date
      likes
      inResponseTo
      conversationId
      user {
        username
        usertag
        avatar
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: Int!
    $usertag: String
    $username: String
    $avatar: String
  ) {
    updateProfile(
      userUpdateInput: {
        id: $id
        usertag: $usertag
        username: $username
        avatar: $avatar
      }
    ) {
      id
    }
  }
`
