import React from 'react';
import {Box, Container} from '@chakra-ui/react';
import LandingVideo from '../Components/landingvideo/LandingVideo';
import {Carousel} from '../Components/carousel/Carousel';
import styles from './GlobalStyle.module.css';
import {Outlet} from 'react-router-dom';

function Home() {
  console.log(window);
  return (
    <>
      <Box position="relative" as="main" bgColor="#181818">
        <LandingVideo />
        <Box className={styles.swiperContainer} as="section">
          <Container className={styles.galerie} as="article">
            <Carousel carouselTitle="recent" />
          </Container>
          <Container className={styles.galerie} as="article">
            <Carousel getMovieFromCategory={2} />
          </Container>
          <Container className={styles.galerie} as="article" mb={50}>
            <Carousel getMovieFromCategory={3} />
          </Container>
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default Home;
