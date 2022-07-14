import React, { useEffect, useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { LandingVideo } from '../Components/Landingvideo/LandingVideo';
import { components } from '../api/typings/api';
import { fetcher } from '../api/fetcher';
import { Carousel } from '../Components/Carousel/Carousel';
import styles from './GlobalStyle.module.css';

function Home() {
  const [landing, setLanding] = useState([] as components['schemas']['LandingResponse']);

  const result = async () => {
    const getLanding = fetcher.path('/landing').method('get').create();

    const queryLanding = {
      populate: 'trailer',
      'populate[0]': 'logo',
    };
    const { data: landingResult } = await getLanding(queryLanding);
    setLanding(landingResult as components['schemas']['LandingResponse']);
  };

  useEffect(() => {
    result();
  }, []);
  //https://api-gratflix.onrender.com/api/movies?filters[category]=7&populate=category

  return (
    <Box position='relative'>
      <LandingVideo landing={landing} />
      <Box className={styles.swiperContainer} as='section'>
        <Container className={styles.galerie} as='article' style={{ maxWidth: 'container.xxl' }}>
          <Carousel category={7} listTitle={'test'} />
        </Container>
        <Container className={styles.galerie} as='article'>
          {/* <Galerie list={6} listTitle={'Sélectionnés pour vous'}/> */}
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
