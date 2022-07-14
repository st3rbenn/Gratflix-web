import React, { useEffect, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { LandingVideo } from '../Components/Landingvideo/LandingVideo';
import { Carousel } from '../Components/Carousel/Carousel';
import styles from './GlobalStyle.module.css';

function Home() {
  //https://api-gratflix.onrender.com/api/movies?filters[category]=7&populate=category

  console.log(process.env);

  return (
    <Box position='relative' as='main'>
      <LandingVideo />
      <Box className={styles.swiperContainer} as='section'>
        <Container className={styles.galerie} as='article' style={{ maxWidth: 'container.xxl' }}>
          <Carousel category={7} listTitle={'Super-Hero'} />
        </Container>
        <Container className={styles.galerie} as='article'>
          <Carousel category={6} listTitle={'Sci-fi'} />
        </Container>
        <Container className={styles.galerie} as='article' mb={50}>
          {/* <Galerie list={7} listTitle={'oe'}/> */}
        </Container>
        <Container className={styles.galerie} as='article' mb={50}>
          {/* <Galerie list={2} listTitle={'oeoe'}/> */}
        </Container>
        <Container className={styles.galerie} as='article' mb={50}>
          {/* <Galerie list={8} listTitle={'test'}/> */}
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
