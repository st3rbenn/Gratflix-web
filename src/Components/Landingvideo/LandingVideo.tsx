import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Img, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { BiErrorCircle, BiRightArrow } from 'react-icons/bi';
import styles from './LandingVideo.module.css';
import { components } from '../../api/typings/api';
import { fetcher } from '../../api/fetcher';
import { MovieModal } from '../Modals/MovieModal';

export const LandingVideo = () => {
  const [landing, setLanding] = useState([] as components['schemas']['LandingResponse']);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const result = async () => {
    const getLanding = fetcher.path('/landing').method('get').create();

    const queryLanding = {
      populate: 'trailer',
      'populate[0]': 'logo',
      'populate[1]': 'Poster',
    };
    const { data: landingResult } = await getLanding(queryLanding);
    setLanding(landingResult as components['schemas']['LandingResponse']);
  };

  useEffect(() => {
    result();
  }, []);

  const trailer = landing?.data?.attributes?.trailer?.data?.attributes?.url;
  const logo = landing?.data?.attributes?.logo?.data?.attributes?.url;
  const poster = landing?.data?.attributes?.Poster?.data?.attributes?.url;

  const Blur = {
    filter: 'contrast(88%) brightness(72%)',
    width: '100%',
    height: '100%',
  };
  return (
    <Box as='section' className={styles.landingContainer}>
      <video
        onAnimationEnd={(ev) => console.log(ev)}
        poster={poster}
        src={trailer}
        style={Blur}
        className={styles.blockClick}
        muted
        playsInline
        autoPlay
        loop
      />
      <Stack className={styles.stackContainer}>
        <Img w='45%' src={logo} mb={7} />
        <Flex alignItems='center' gap={6}>
          <Button variant='outline' className={styles.BtnStyle} color='white' w='max-content' _hover={Blur}>
            <Text p={5}>Regarder</Text>
            <BiRightArrow size='100%' />
          </Button>
          <Button
            variant='outline'
            className={styles.BtnStyle}
            color='white'
            w='max-content'
            _hover={Blur}
            onClick={onOpen}>
            <Text p={5}>Plus d'infos</Text>
            <BiErrorCircle size='100%' />
          </Button>
        </Flex>
      </Stack>
      <MovieModal landing={landing} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
