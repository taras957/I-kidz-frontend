import React from 'react';
import { QueryClient, QueryCache, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import { I18nextProvider } from 'react-i18next';
import ContentWidthProvider from 'context/content-width';
import ModalProvider from 'components/common/modal';
import { toast } from 'react-toastify';

import i18n from 'i18n';
import { globalToastSettings } from '@/components/common/toaster';
const queryConfig = {
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        toast.error(
          `Something went wrong: ${error.message}`,
          globalToastSettings
        );
      }
    },
  }),
  queries: {
    useErrorBoundary: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,

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
