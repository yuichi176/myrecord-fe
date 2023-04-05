import Layout from '@/components/Layout'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Post } from '@/types/post'
import PostTable from '@/components/post/PostTable'
import { Container } from '@mui/material'
import { getPost } from '@/libs/apiCall/post/postClient'

type PathParams = {
  collection: string
}

type Props = {
  posts: Post[]
  user: string
  collection_name: string
}

const Posts = ({ posts, user, collection_name }: Props) => {
  return (
    <Layout title='myrecord' user={user}>
      <Container maxWidth='md' sx={{ flex: 1 }}>
        <PostTable initialRows={posts} user={user} collection_name={collection_name} />
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const user = session?.user?.email
  const { collection } = context.params as PathParams
  const posts = !user ? [] : await getPost({ user: user, collection_name: collection })
  return { props: { posts: posts, user: user, collection_name: collection } }
}

export default Posts
