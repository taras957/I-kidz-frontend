import Head from 'next/head';
import { projectBootstrapQuery } from 'queries/index';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Header from 'components/layout/header';
import Container from 'components/layout/container';
import WaveBackground from 'components/layout/wave-background';
import Hero from 'components/home/hero';
import AboutUs from 'components/home/about-us';
import Testimonials from 'components/home/testimonials';
import Team from 'components/home/team';
import Development from 'components/home/development';
import Courses from 'components/home/courses';
import Friends from 'components/home/our-friends';
import Gallery from 'components/home/gallery';
import Map from 'components/home/map';
import Modal from 'components/home/test-lesson-modal';
import axios from 'axios';
import { IProjectBootstrap } from 'interfaces/home';
import css from './style.module.css';

const apiURL = process.env.NEXT_PUBLIC_API;
const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;

export async function bootstrapApp(): Promise<IProjectBootstrap> {
  const bootstrap = await axios.get(`${apiURL}/${apiPrefix}/bootstrap`);
  return bootstrap.data;
}

export async function getStaticProps() {
  try {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(projectBootstrapQuery, bootstrapApp);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <title>IKIDZ</title>
        <meta
          name="description"
          content="Ikidz modern programming school for children"
        ></meta>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500&family=VT323&display=swap"
          rel="stylesheet"
        ></link>
        {/* <html lang="ua"></html> */}
      </Head>

      <div className={css.root}>
        <Modal />
        <Header />
        <WaveBackground>
          <Container>
            <Hero />
          </Container>
        </WaveBackground>
        <Container>
          <AboutUs />
          <Testimonials />
          <Team />
          <Development />
        </Container>
        <img className={css.wave} src="images/s4i6.png" alt="waves" />
        <Container>
          <Courses />
          <Friends />
          <Gallery />
        </Container>
        <Map />
        {/* <Footer>{(children) => <Container>{children}</Container>}</Footer> */}
      </div>
    </>
  );
}
