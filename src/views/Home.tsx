import { Box, Container } from '@chakra-ui/react';
import { LandingVideo } from '../Components/Landingvideo/LandingVideo';
import { Carousel } from '../Components/Carousel/Carousel';
import styles from './GlobalStyle.module.css';

function Home() {
  return (
    <Box position='relative' as='main'>
      <LandingVideo />
      <Box className={styles.swiperContainer} as='section'>
        <Container className={styles.galerie} as='article' style={{ maxWidth: 'container.xxl' }}>
          <Carousel carouselTitle='recent' />
        </Container>
        <Container className={styles.galerie} as='article'>
          <Carousel getMovieFromList={2} />
        </Container>
        <Container className={styles.galerie} as='article' mb={50}>
          <Carousel getMovieFromList={3} />
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
