import { User } from '@/types/user'
import { isObject } from '@/utils'

export type Post = {
  id: string
  user?: string
  animeName: string
  rating: number
  createdAt: string
  updatedAt?: string
  deletedAt?: string
  deleteFlg?: boolean
}

export type Posts = {
  posts: Post[]
}

export type PostSearchQuery = {
  userName: User['userName']
}

export type PostPostBody = {
  user: string
  animeName: string | null
  rating: number | null
}

export type PostPatchBody = {
  id: string
  user: string
  animeName: string | null
  rating: number | null
}

export type PostGetResponse = {
  id: string
  animeName: string
  rating: number
  createdAt: string
}

export type PostPostResponse = {
  id: string
  animeName: string
  rating: number
  createdAt: string
}

export type PostPatchResponse = {
  id: string
  animeName: string
  rating: number
  createdAt: string
  updatedAt: string
}

export const isPostPostBody = (postPostBody: unknown): postPostBody is PostPostBody => {
  if (!isObject<PostPostBody>(postPostBody)) {
    return false
  }
  if (
    'user' in postPostBody &&
    typeof postPostBody.user === 'string' &&
    'animeName' in postPostBody &&
    typeof postPostBody.animeName === 'string' &&
    'rating' in postPostBody &&
    typeof postPostBody.rating === 'number'
  ) {
    return true
  }
  return false
}

export const isPostPatchBody = (postPatchBody: unknown): postPatchBody is PostPatchBody => {
  if (!isObject<PostPatchBody>(postPatchBody)) {
    return false
  }
  if (
    'id' in postPatchBody &&
    typeof postPatchBody.id === 'string' &&
    'user' in postPatchBody &&
    typeof postPatchBody.user === 'string' &&
    'animeName' in postPatchBody &&
    typeof postPatchBody.animeName === 'string' &&
    'rating' in postPatchBody &&
    typeof postPatchBody.rating === 'number'
  ) {
    return true
  }
  return false
}

export const isPostId = (postId: unknown): postId is Post['id'] => {
  return typeof postId === 'string'
}
