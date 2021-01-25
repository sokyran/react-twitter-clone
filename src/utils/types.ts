export interface ITweet {
  id: number
  text: string
  date: number
  user: IUser
  imageUrl?: string
}

export interface IUser {
  username: string
  usertag: string
  avatar: string
}
