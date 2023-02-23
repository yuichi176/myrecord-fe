import React, { ReactNode } from 'react'
import Head from 'next/head'
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'animemo' }: Props) => {

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
            <Toolbar>
              <AutoStoriesIcon sx={{ mr: 1 }} />
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                myrecord
              </Typography>
              <Button color='inherit'>
                Logout
              </Button>
            </Toolbar>
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
