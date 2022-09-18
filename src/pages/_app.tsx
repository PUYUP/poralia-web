import '../styles/globals.css'
import Head from 'next/head'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { SessionProvider } from "next-auth/react"

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../lib/_theme'
import { store } from '../lib/store'
import { Provider } from 'react-redux'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function MyApp({ 
  Component, 
  pageProps: { session, ...pageProps} 
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
    
      {getLayout(
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <SessionProvider session={session}>
                <Component {...pageProps} />
              </SessionProvider>
            </Provider>
          </ThemeProvider>
        </LocalizationProvider>
      )}
    </>
  )
}

export default MyApp