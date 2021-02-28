import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  mutation signIn($usertag: String!, $password: String!) {
    signIn(userLoginInput: { usertag: $usertag, password: $password }) {
      accessToken
      username
      usertag
      avatar
      id
      likedTweets
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
      }
    }
  }
`

export const GET_TWEETS_FOR_PROFILE = gql`
  query tweetsByUser(
    $usertag: String!
    $withComments: Boolean
    $loadLikes: Boolean
  ) {
    tweetsByUser(
      usertag: $usertag
      withComments: $withComments
      loadLikes: $loadLikes
    ) {
      id
      text
      date
      likes
      user {
        username
        usertag
        avatar
      }
    }
  }
`

export const LIKE_TWEET_QUERY = gql`
  mutation likeTweet($id: Int!) {
    likeTweet(id: $id) {
      likes
      id
    }
  }
`

export const UNLIKE_TWEET_QUERY = gql`
  mutation unlikeTweet($id: Int!) {
    unlikeTweet(id: $id) {
      likes
      id
    }
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

export const GET_PROFILE = gql`
  query getProfile($usertag: String!) {
    getProfile(usertag: $usertag) {
      id
      avatar
      username
      usertag
      profile {
        registrationDate
        biography
        location
        backgroundImage
      }
    }
  }
`
