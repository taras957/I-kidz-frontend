import { render as rtlRender } from '@testing-library/react';

import { setLogger } from 'react-query';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import ModalProvider from 'components/common/modal';
import i18n from 'i18n';

export function customRender(ui, { ...renderOptions } = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
        cacheTime: Infinity,
      },
    },
  });
  setLogger({
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console
  });

  function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <ModalProvider>{children}</ModalProvider>
        </I18nextProvider>
      </QueryClientProvider>
    );
  }
  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    queryClient,
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
  };
}
// re-export everything
export * from '@testing-library/react';
export { customRender as render };
