import css from "./style.module.css";
import Head from "next/head";

import Header from "components/layout/header";
import Container from "components/layout/container";
import WaveBackground from "components/layout/wave-background";
import Hero from "components/home/hero";
import AboutUs from "components/home/about-us";
import Testimonials from "components/home/testimonials";
import Team from "components/home/team";
import Development from "components/home/development";
import Courses from "components/home/courses";
import Friends from "components/home/our-friends";
import Gallery from "components/home/gallery";
import Map from "components/home/map";
import Footer from "components/layout/footer";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyACkxqpBmKSrBtab20EBdxZNDDxZRuoOSc"
        ></script>
      </Head>
      <div className={css["root"]}>
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
        <img className={css["wave"]} src="images/s4i6.png" alt="waves" />
        <Container>
          <Courses />
          <Friends />
          <Gallery />
        </Container>
        <Map />
        <Footer>{(children) => <Container>{children}</Container>}</Footer>
      </div>
    </>
  );
}
