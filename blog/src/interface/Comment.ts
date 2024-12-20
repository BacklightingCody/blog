import { User } from './User'
export interface Reply {
  id: number
  user: User
  content: string
  likes: number
  time: number | string
  replyTo?: string
}

export interface Comment {
  id: number
  user: User
  content: string
  likes: number
  time: number | string
  replies?: Reply[]
}