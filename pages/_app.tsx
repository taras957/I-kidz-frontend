import '../styles/globals.css';
import '../styles/reset.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-tabs/style/react-tabs.css';
import 'react-toggle/style.css'; // for ES6 modules

import SpinnerLarge from '../components/common/spinner-large';
import Providers from 'context';

function MyApp({ Component, pageProps }) {
  return (
    <Providers pageProps={pageProps}>
      <Component {...pageProps} />
      <SpinnerLarge />
    </Providers>
  );
}

export default MyApp;
