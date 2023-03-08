import { FailedCallApiError } from '@/types/errors/FailedCallApiError'
import {
  isPostPostBody,
  isPostSearchQuery,
  PostPostBody, PostPostResponse,
} from "@/types/post";
import { NextApiRequest, NextApiResponse } from 'next'
import { env } from "@/config/env";
import { httpClient } from "@/libs/apiCall/httpClient";

export default async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const apiEndpoint = `${env.BE_PROTOCOL}://${env.BE_BASE_DOMAIN}/posts`
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        if (!isPostSearchQuery(req.query)) {
          res.status(400).send('invalid post search query')
        } else {
          const { user } = req.query
          const posts = await httpClient.get(`${apiEndpoint}?user=${user}`)
          res.status(200).send(posts)
        }
      } catch (error) {
        console.error(`fail to get posts:${(error as Error).message}`)
        console.error(error)
        res.status(500).json(error)
      }
      break
    case 'POST':
      try {
        if (!isPostPostBody(req.body)) {
          res.status(400).send('invalid post body')
        }
        const body: PostPostBody = { ...req.body }
        const response = await httpClient.post<PostPostResponse>(apiEndpoint, body)
        res.status(201).json(response)
      } catch (error) {
        if (error instanceof FailedCallApiError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).json(error)
        }
      }
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
