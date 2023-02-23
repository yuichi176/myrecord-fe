import {
  Post,
  PostPatchBody,
  PostPostBody,
  PostSearchQuery,
  PostGetResponse,
  PostPostResponse,
  PostPatchResponse,
} from '@/types/post'
import { env } from '@/config/env'
import { animemoApiClient } from '../../animemoApiClient'
import { mergePostSearchQueryIntoUrl } from './postClientUtils'

const apiEndpoint = `${env.ANIMEMO_API_URL}/v1/posts/`

export async function getPost(query: PostSearchQuery): Promise<PostGetResponse[]> {
  const url = mergePostSearchQueryIntoUrl(query, new URL(apiEndpoint))
  const res = await animemoApiClient.get<PostGetResponse[]>(url.href)
  return res
}

export async function postPost(body: PostPostBody): Promise<PostPostResponse> {
  return await animemoApiClient.post<PostPostResponse>(apiEndpoint, body)
}

export async function patchPost(body: PostPatchBody): Promise<PostPatchResponse> {
  return await animemoApiClient.patch<PostPatchResponse>(apiEndpoint, body)
}

export async function deletePost(id: Post['id']): Promise<void> {
  const url = new URL(id, apiEndpoint)
  console.log(url.href)
  await animemoApiClient.delete(url.href)
}
