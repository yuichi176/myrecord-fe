import type { AppProps } from 'next/app'
import '@/style.css'
import { getSession, SessionProvider } from 'next-auth/react'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

MyApp.getInitialProps = async (context: any) => {
  const { ctx } = context
  const session = await getSession(context)
  const props = { session: session }

  if (!session) {
    ctx.res.writeHead(302, { Location: '/api/auth/signin' })
    ctx.res.end()
    return {}
  }

  return {
    pageProps: { ...props },
  }
}

export default MyApp
