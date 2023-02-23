import { Post, PostPatchBody, PostPatchResponse, PostPostBody, PostPostResponse } from '@/types/post'
import { httpClient } from '@/libs/apiCall/httpClient'

const apiEndpoint = '/api/post/'

export async function postPost(body: PostPostBody): Promise<PostPostResponse> {
  return await httpClient.post(apiEndpoint, body)
}

export async function patchPost(body: PostPatchBody): Promise<PostPatchResponse> {
  return await httpClient.patch(apiEndpoint, body)
}

export async function deletePost(id: Post['id']): Promise<void> {
  await httpClient.delete(`${apiEndpoint}${id}`)
}
