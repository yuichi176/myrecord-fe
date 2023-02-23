import { patchPost, postPost } from '@/libs/apiCall/external/post/postClient'
import { FailedCallApiError } from '@/types/errors/FailedCallApiError'
import { isPostPatchBody, isPostPostBody, PostPatchBody, PostPostBody } from '@/types/post'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function postHandller(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        if (!isPostPostBody(req.body)) {
          res.status(400).send('invalid post body')
        }

        const postPostBody: PostPostBody = {
          ...req.body,
        }
        const response = await postPost(postPostBody)

        res.status(200).json(response)
      } catch (error) {
        if (error instanceof FailedCallApiError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.status(500).json(error)
        }
      }
      break

    case 'PATCH':
      try {
        if (!isPostPatchBody(req.body)) {
          res.status(400).send('invalid post body')
        }

        const postPatchBody: PostPatchBody = {
          ...req.body,
        }
        const response = await patchPost(postPatchBody)

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
