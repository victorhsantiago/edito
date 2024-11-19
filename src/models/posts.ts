import type { User } from './users'

export type PostsList = PostItem[]
export type PostsWithAuthorList = PostItemWithAuthor[]

export interface PostItem {
  userId: number
  id: number
  title: string
  body: string
}

export interface PostItemWithAuthor extends PostItem {
  author?: User
}
