import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Button, Flex, Image, Img, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { BiErrorCircle, BiRightArrow } from 'react-icons/bi';
import styles from './LandingVideo.module.css';
import { components } from '../../api/typings/api';
import { fetcher } from '../../api/fetcher';
import { MovieModal } from '../Modals/MovieModal';

export const LandingVideo = () => {
  const [landing, setLanding] = useState([] as components['schemas']['LandingResponse']);
  const [videoEnd, setVideoEnd] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const result = async () => {
    const getLanding = fetcher.path('/landing').method('get').create();

    const queryLanding = {
      populate: 'movie',
      'populate[1]': 'movie.Logo',
      'populate[2]': 'movie.bigposter',
      'populate[3]': 'movie.poster',
      'populate[4]': 'movie.trailer',
    };
    const { data: landingResult } = await getLanding(queryLanding);
    setLanding(landingResult as components['schemas']['LandingResponse']);
  };

  const handlePlay = (ev: SyntheticEvent<HTMLMediaElement>) => {
    console.log('ev', { ev });
    setVideoEnd(true);
  };

  useEffect(() => {
    result();
  }, []);

  const trailer = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    landing?.data?.attributes?.movie?.data?.attributes?.trailer?.data?.attributes?.url?.split('/')[3]
  }`;
  const logo = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    landing?.data?.attributes?.movie?.data?.attributes?.Logo?.data?.attributes?.url?.split('/')[3]
  }`;
  const poster = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    landing?.data?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
  }`;

  const Blur = {
    filter: 'contrast(88%) brightness(72%)',
  };
  return (
    <Box as='section' className={styles.landingContainer}>
      <Box position='relative'>
        {videoEnd ? (
          <>
            <Box className={styles.image} style={{ zIndex: 1 }}></Box>
            <Image src={poster} className={styles.blockClick} />
          </>
        ) : (
          <>
            <Box className={styles.image} style={{ zIndex: 1 }}></Box>
            <video
              poster={poster}
              src={trailer}
              style={{ width: 'auto', height: 'auto' }}
              className={styles.blockClick}
              muted
              autoPlay
              playsInline
              onEnded={(ev) => handlePlay(ev)}
            />
          </>
        )}
      </Box>
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
