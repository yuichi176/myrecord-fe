import { env } from '@/config/env'
import { httpClient } from '@/libs/apiCall/httpClient'
import { Collection } from '@/types/collection'
import { CollectionPostBody, CollectionSearchQuery } from '@/types/collection/form'

/**
 * Next API Routesを呼び出す
 */
const apiEndpoint = `${env.BFF_PROTOCOL}://${env.BFF_BASE_DOMAIN}/api/collection`

export async function getCollection(query: CollectionSearchQuery): Promise<Collection[]> {
  const { user } = query
  return await httpClient.get(`${apiEndpoint}?user=${user}`)
}

export async function postCollection(body: CollectionPostBody): Promise<Collection> {
  return await httpClient.post(apiEndpoint, body)
}

export async function deleteCollection(id: Collection['id']): Promise<void> {
  await httpClient.delete(`${apiEndpoint}/${id}`)
}
