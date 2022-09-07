import React, {useEffect, useState} from 'react';
import {Box, Container} from '@chakra-ui/react';
import LandingVideo from 'src/Components/landingvideo/LandingVideo';
import {Carousel} from 'src/Components/carousel/Carousel';
import styles from './GlobalStyle.module.css';
import {Outlet} from 'react-router-dom';

function Home() {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));
  }, []);
  return (
    <>
      <Box position="relative" as="main" bgColor="#181818">
        <LandingVideo />
        <Box className={styles.swiperContainer} as="section" top={currentWidth > 768 ? '80%' : '100%'}>
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
