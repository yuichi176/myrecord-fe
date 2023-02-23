import { PostSearchQuery } from '@/types/post'

export const mergePostSearchQueryIntoUrl = (postSearchQuery: PostSearchQuery, url: URL) => {
  url.searchParams.append('user', postSearchQuery.userName)
  return url
}
