import { FailedCallApiError } from '@/types/errors/FailedCallApiError'
import { isPostId, isPostPutBody } from "@/types/post";
import { NextApiRequest, NextApiResponse } from 'next'
import { env } from "@/config/env";
import { httpClient } from "@/libs/apiCall/httpClient";

export default async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const apiEndpoint = `${env.BE_PROTOCOL}://${env.BE_BASE_DOMAIN}/posts`
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        if (!isPostId(req.query.id)) {
          res.status(400).send('invalid post id')
        }
        const id = req.query.id
        const response = await httpClient.get(`${apiEndpoint}/${id}`)
        res.status(200).json(response)
      } catch (error) {
        if (error instanceof FailedCallApiError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).json(error)
        }
      }
      break
    case 'PUT':
      try {
        if (!isPostId(req.query.id)) {
          res.status(400).send('invalid post id')
        }
        if (!isPostPutBody(req.body)) {
          res.status(400).send('invalid post body')
        }
        const id = req.query.id
        const body = { ...req.body }
        const response = await httpClient.put(`${apiEndpoint}/${id}`, body)
        res.status(200).json(response)
      } catch (error) {
        if (error instanceof FailedCallApiError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).json(error)
        }
      }
      break
    case 'DELETE':
      try {
        if (!isPostId(req.query.id)) {
          res.status(400).send('invalid post id')
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
