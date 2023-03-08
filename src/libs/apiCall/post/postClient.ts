import {
  Post,
  PostGetResponse,
  PostPostBody,
  PostPostResponse, PostPutBody, PostPutResponse,
  PostSearchQuery
} from "@/types/post";
import { env } from "@/config/env";
import { httpClient } from '@/libs/apiCall/httpClient'

/**
 * Next API Routesを呼び出す
 */
const apiEndpoint = `${env.BFF_PROTOCOL}://${env.BFF_BASE_DOMAIN}/api/post`

export async function getPost(query: PostSearchQuery): Promise<PostGetResponse[]> {
  const { user } = query
  return await httpClient.get(`${apiEndpoint}?user=${user}`)
}

export async function getPostById(id: Post['id']): Promise<Post> {
  return await httpClient.get(`${apiEndpoint}/${id}`)
}

export async function postPost(body: PostPostBody): Promise<PostPostResponse> {
  return await httpClient.post(apiEndpoint, body)
}

export async function putPost(id: Post['id'], body: PostPutBody): Promise<PostPutResponse> {
  return await httpClient.put(`${apiEndpoint}/${id}`, body)
}

export async function deletePost(id: Post['id']): Promise<void> {
  await httpClient.delete(`${apiEndpoint}/${id}`)
}
