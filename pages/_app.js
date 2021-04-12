import "../styles/globals.css";
import "../styles/reset.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Providers from 'context'

function MyApp({ Component, pageProps }) {
  return (
    <Providers pageProps={pageProps}>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
