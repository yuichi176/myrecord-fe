import { deletePost } from '@/libs/apiCall/external/post/postClient'
import { FailedCallApiError } from '@/types/errors/FailedCallApiError'
import { isPostId } from '@/types/post'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function postHandller(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'DELETE':
      try {
        const id = req.query.id as string
        if (!isPostId(id)) {
          res.status(400).send('invalid post id')
        }
        const response = await deletePost(id)

        res.status(200).json(response)
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
