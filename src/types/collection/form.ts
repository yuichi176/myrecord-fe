import { isObject } from '@/utils'
import { Collection } from '@/types/collection/index'

export type CollectionSearchQuery = {
  user: String
}

export type CollectionPostBody = {
  name: string
  user: string
}

export const isCollectionSearchQuery = (query: unknown): query is CollectionSearchQuery => {
  if (!isObject<CollectionSearchQuery>(query)) {
    return false
  }
  const { user } = query
  if (user == null) {
    return false
  }
  return true
}

export const isCollectionPostBody = (collectionPostBody: unknown): collectionPostBody is CollectionPostBody => {
  if (!isObject<CollectionPostBody>(collectionPostBody)) {
    return false
  }
  if (
    'user' in collectionPostBody &&
    typeof collectionPostBody.user === 'string' &&
    'name' in collectionPostBody &&
    typeof collectionPostBody.name === 'string'
  ) {
    return true
  }
  return false
}

export const isCollectionId = (id: unknown): id is Collection['id'] => {
  return typeof id === 'string'
}
