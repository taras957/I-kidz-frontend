import React from 'react'
 import {
 
   QueryClient,
   QueryClientProvider,
 } from 'react-query'
  import { Hydrate } from 'react-query/hydration'

import { I18nextProvider } from "react-i18next";
import ContentWidthProvider from "context/content-width";
import i18n from "i18n";
const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
  },
}
const AppContextProviders = ({children,pageProps}) => {
       const queryClientRef = React.useRef()
   if (!queryClientRef.current) {
     queryClientRef.current = new QueryClient(queryConfig)
   }

    return (
         <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClientRef.current}>
         <Hydrate state={pageProps.dehydratedState}>
        <ContentWidthProvider>
            {children}
        </ContentWidthProvider>
        </Hydrate>
        </QueryClientProvider>
        </I18nextProvider>

    )
}

export default AppContextProviders
