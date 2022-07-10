import React, { useEffect, useState } from 'react';
import { Box, ChakraProps, Container } from '@chakra-ui/react';
import { LandingVideo } from '../Components/Landingvideo/LandingVideo';
import { components } from '../api/typings/api';
import { fetcher } from '../api/fetcher';

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

  return (
    <Box position='relative'>
      <LandingVideo landing={landing} />
      <Box {...(swiperContainerSettings as ChakraProps)}>
        <Container {...(GalerieSettings as ChakraProps)}>
          {/* <Galerie list={1} listTitle={'Tendances actuelles'}/> */}
        </Container>
        <Container {...(GalerieSettings as ChakraProps)}>
          {/* <Galerie list={6} listTitle={'Sélectionnés pour vous'}/> */}
        </Container>
        <Container {...(GalerieSettings as ChakraProps)} mb={50}>
          {/* <Galerie list={7} listTitle={'oe'}/> */}
        </Container>
        <Container {...(GalerieSettings as ChakraProps)} mb={50}>
          {/* <Galerie list={2} listTitle={'oeoe'}/> */}
        </Container>
        <Container {...(GalerieSettings as ChakraProps)} mb={50}>
          {/* <Galerie list={8} listTitle={'test'}/> */}
        </Container>
      </Box>
    </Box>
  );
}

const GalerieSettings = {
  maxW: 'container.xxl',
  as: 'article',
  mb: 5,
  mt: 5,
};

const swiperContainerSettings = {
  boxShadow: '1px 0px 69px 140px rgb(20, 20, 20)',
  zIndex: 100,
  ml: 55,
  mr: 55,
  position: 'relative',
  as: 'section',
};

export default Home;
