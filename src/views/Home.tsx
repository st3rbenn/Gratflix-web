import React from 'react';
import {Box, Container} from '@chakra-ui/react';
import LandingVideo from '../Components/Landingvideo/LandingVideo';
import {Carousel} from '../Components/Carousel/Carousel';
import styles from './GlobalStyle.module.css';
import {Outlet} from 'react-router-dom';

function Home() {
  const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return (
    <>
      <Box position="relative" as="main" bgColor="#181818">
        <LandingVideo />
        <Box className={styles.swiperContainer} as="section" style={userAgent ? {overflow: 'auto'} : {}}>
          <Container className={styles.galerie} as="article">
            <Carousel carouselTitle="recent" />
          </Container>
          <Container className={styles.galerie} as="article">
            <Carousel getMovieFromCategory={2} />
          </Container>
          <Container className={styles.galerie} as="article" mb={50}>
            <Carousel getMovieFromCategory={3} />
          </Container>
          {/* <Container className={styles.galerie} as='article' mb={50}>
              <Galerie list={2} listTitle={'oeoe'}/>
            </Container>
            <Container className={styles.galerie} as='article' mb={50}>
              <Galerie list={8} listTitle={'test'}/>
            </Container> */}
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default Home;
