import React, { ReactNode } from 'react'
import Head from 'next/head'
import { AppBar, Box, Typography, Button } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

type Props = {
  children?: ReactNode
  title?: string
  user?: string
}

const Layout = ({ children, title = 'animemo', user }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box sx={{ flexGrow: 1, mb: 3, flex: 0 }}>
          <AppBar position='static' sx={{ background: '#4682b4' }}>
            <div className='flex items-center justify-between px-[16px] min-h-[56px] lg:px-[24px] lg:min-h-[64px]'>
              <Link href='/collections'>
                <div className='flex items-center'>
                  <AutoStoriesIcon sx={{ mr: 1 }} />
                  <Typography variant='h6' component='div'>
                    myrecord
                  </Typography>
                </div>
              </Link>
              {user ? (
                <div className=''>
                  <p className='hidden md:inline mr-7 text-sm'>{user}</p>
                  <Button color='inherit' onClick={() => signOut()}>
                    Logout
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </AppBar>
        </Box>
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Box
          sx={{
            height: '80px',
            background: '#4682b4',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <footer>
            <Typography variant='caption' component='span'>
              ©&nbsp;yuichi-sugiyama
            </Typography>
          </footer>
        </Box>
      </Box>
    </div>
  )
}

export default Layout
