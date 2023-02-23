import * as React from 'react'
import { Post } from '@/types/post'
import { getPost } from '@/libs/apiCall/external/post/postClient'
import { getSession, useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import { Container } from '@mui/material'
import PostTable from '@/components/PostTable'

type Props = {
  data: Post[]
}

const TopPage = ({ data }: Props) => {
  return (
    <Layout title='myrecord'>
      <Container maxWidth='md' sx={{ flex: 1 }}>
        <PostTable initialRows={data} />
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  const userName = session?.user?.email != null ? session?.user?.email : ''
  const data = await getPost({ userName: userName })
  return { props: { data } }
}

export default TopPage
