import { NextApiRequest, NextApiResponse } from 'next'
import { env } from '@/config/env'
import { httpClient } from '@/libs/apiCall/httpClient'
import { FailedCallApiError } from '@/types/errors/FailedCallApiError'
import { isCollectionId } from '@/types/collection/form'

export default async function collectionHandler(req: NextApiRequest, res: NextApiResponse) {
  const apiEndpoint = `${env.BE_PROTOCOL}://${env.BE_BASE_DOMAIN}/collections`
  const { method } = req
  switch (method) {
    case 'DELETE':
      try {
        if (!isCollectionId(req.query.id)) {
          res.status(400).send('invalid collection id')
        }
        const id = req.query.id
        await httpClient.delete(`${apiEndpoint}/${id}`)
        res.status(204).end()
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
