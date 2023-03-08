import { isObject } from '@/utils'

export type Post = {
  id: string;
  anime_name: string;
  rating: number;
  user?: string;
  delete_flag?: 1 | 0;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
}

export type Posts = {
  posts: Post[]
}

export type PostSearchQuery = {
  user: String
}

export type PostPostBody = {
  user: string
  anime_name?: string
  rating?: number
}

export type PostPutBody = {
  user: string
  anime_name: string
  rating: number
}

export type PostGetResponse = {
  id: string
  anime_name: string
  rating: number
  created_at: string
}

export type PostPostResponse = {
  id: string
  anime_name: string
  rating: number
  created_at: string
}

export type PostPutResponse = {
  id: string
  anime_name: string
  rating: number
  created_at: string
  updated_at: string
}

export const isPostSearchQuery = (query: unknown): query is PostSearchQuery => {
  if (!isObject<PostSearchQuery>(query)) {
    return false
  }
  const { user } = query
  if (user == null) {
    return false
  }
  return true
}

export const isPostPostBody = (postPostBody: unknown): postPostBody is PostPostBody => {
  if (!isObject<PostPostBody>(postPostBody)) {
    return false
  }
  if (
    'user' in postPostBody &&
    typeof postPostBody.user === 'string' &&
    'anime_name' in postPostBody &&
    typeof postPostBody.anime_name === 'string' &&
    'rating' in postPostBody &&
    typeof postPostBody.rating === 'number'
  ) {
    return true
  }
  return false
}

export const isPostPutBody = (postPutBody: unknown): postPutBody is PostPutBody => {
  if (!isObject<PostPutBody>(postPutBody)) {
    return false
  }
  if (
    'user' in postPutBody &&
    typeof postPutBody.user === 'string' &&
    'anime_name' in postPutBody &&
    typeof postPutBody.anime_name === 'string' &&
    'rating' in postPutBody &&
    typeof postPutBody.rating === 'number'
  ) {
    return true
  }
  return false
}

export const isPostId = (postId: unknown): postId is Post['id'] => {
  return typeof postId === 'string'
}
