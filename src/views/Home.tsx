import {Box, Container} from '@chakra-ui/react';
import {GetServerCapabilitiesResponse} from '@lukehagar/plexjs';
import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {Carousel} from 'src/Components/Carousel/Carousel';
import {getServerCapabilities} from 'src/plexAPI/fetcher';
import styles from './GlobalStyle.module.css';
import LandingVideo from 'src/Components/Landingvideo/LandingVideo';

function Home() {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));
  }, []);

  const handleGetServerCap = async (): Promise<GetServerCapabilitiesResponse> => {
    const serverCap = await getServerCapabilities();
    console.log(serverCap);
    return serverCap;
  };

  return (
    <>
      <Box position="relative" as="main" bgColor="#181818">
        <LandingVideo />
        <Box className={styles.swiperContainer} as="section" top={currentWidth > 768 ? '80%' : '100%'}>
          <Container className={styles.galerie} as="article">
            <Carousel carouselTitle="Recent" />
          </Container>
          <Container className={styles.galerie} as="article">
            <Carousel carouselTitle="Action" />
          </Container>
          <Container className={styles.galerie} as="article" mb={50}>
            <Carousel carouselTitle="Adventure" />
          </Container>
          <Container className={styles.galerie} as="article" mb={50}>
            <Carousel carouselTitle="Continue" />
          </Container>
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default Home;
