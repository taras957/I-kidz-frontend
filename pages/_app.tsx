import '../styles/globals.css';
import '../styles/reset.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-tabs/style/react-tabs.css';
import 'react-toggle/style.css'; // for ES6 modules
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

import SpinnerLarge from '../components/common/spinner-large';
import Providers from 'context';
import Toaster from '@/components/admin-page/common/toaster';

function MyApp({ Component, pageProps }) {
  return (
    <Providers pageProps={pageProps}>
      <Component {...pageProps} />
      <Toaster />
      <SpinnerLarge />
    </Providers>
  );
}

export default MyApp;
