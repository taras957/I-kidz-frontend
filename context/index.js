import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import { I18nextProvider } from 'react-i18next';
import ContentWidthProvider from 'context/content-width';
import ModalProvider from 'components/common/modal';
import i18n from 'i18n';
const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnMount: false,
    refetchOnWindowFocus: true,

    retry(failureCount, error) {
      if (error.status === 404) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  },
};
const AppContextProviders = ({ children, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient(queryConfig));

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ContentWidthProvider>
            <ModalProvider>{children}</ModalProvider>
          </ContentWidthProvider>
        </Hydrate>
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default AppContextProviders;
