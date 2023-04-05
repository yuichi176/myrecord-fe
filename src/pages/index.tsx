import * as React from 'react'
import Layout from '@/components/Layout'
import { getProviders, signIn } from 'next-auth/react'
import { ClientSafeProvider } from 'next-auth/react/types'
import { getServerSession } from 'next-auth'
import { GetServerSideProps } from 'next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Provider } from 'next-auth/providers'

type Props = {
  providers: ClientSafeProvider
}

const TopPage = ({ providers }: Props) => {
  const providerList = (provider: Provider) => {
    if (provider.name === 'GitHub')
      return (
        <li
          key={provider.name}
          className='mb-5 rounded-lg bg-slate-900 py-2 px-5 text-center cursor-pointer hover:opacity-75'
          onClick={() => signIn(provider.id)}
        >
          <button className='text-white'>
            <GitHubIcon color='inherit' />
            <span className='ml-2'>Sign in with GitHub</span>
          </button>
        </li>
      )
    else if (provider.name === 'Google')
      return (
        <li
          key={provider.name}
          className='mb-5 rounded-lg border border-black bg-white py-2 px-5 text-center cursor-pointer hover:opacity-75'
          onClick={() => signIn(provider.id)}
        >
          <button className='text-black'>
            <GoogleIcon color='inherit' />
            <span className='ml-2'>Sign in with Google</span>
          </button>
        </li>
      )
  }

  return (
    <>
      <Layout title='myrecord'>
        <div className='fixed top-1/4 left-0 right-0 m-auto w-[350px] h-[250px] max-w-lg rounded-lg shadow-[0_7px_29px_0_rgba(100,100,111,0.2)]'>
          <div className='flex justify-center items-center h-full flex-col'>
            <h1 className='font-bold text-lg mb-5'>Sign In</h1>
            <ul className='max-w-xs flex flex-col'>
              {Object.values(providers).map((provider) => (
                <>{providerList(provider)}</>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    const providers = await getProviders()
    return { props: { providers: providers ?? [] } }
  } else {
    return {
      // ログイン中の場合はcollectionsページにリダイレクト
      redirect: {
        destination: '/collections',
        permanent: false,
      },
    }
  }
}

export default TopPage
