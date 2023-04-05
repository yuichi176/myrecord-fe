import { NextApiRequest, NextApiResponse } from 'next'
import { env } from '@/config/env'
import { httpClient } from '@/libs/apiCall/httpClient'
import { FailedCallApiError } from '@/types/errors/FailedCallApiError'
import { Collection } from '@/types/collection'
import { CollectionPostBody, isCollectionPostBody, isCollectionSearchQuery } from '@/types/collection/form'

export default async function collectionHandler(req: NextApiRequest, res: NextApiResponse) {
  const apiEndpoint = `${env.BE_PROTOCOL}://${env.BE_BASE_DOMAIN}/collections`
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        if (!isCollectionSearchQuery(req.query)) {
          res.status(400).send('invalid collection search query')
        } else {
          const { user } = req.query
          const collections = await httpClient.get(`${apiEndpoint}?user=${user}`)
          res.status(200).send(collections)
        }
      } catch (error) {
        console.error(`fail to get collections:${(error as Error).message}`)
        console.error(error)
        res.status(500).json(error)
      }
      break
    case 'POST':
      try {
        if (!isCollectionPostBody(req.body)) {
          res.status(400).send('invalid collection post body')
        }
        const body: CollectionPostBody = { ...req.body }
        const response = await httpClient.post<Collection>(apiEndpoint, body)
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
