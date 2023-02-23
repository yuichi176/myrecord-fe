import type { AppProps } from 'next/app'
import '@/style.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
