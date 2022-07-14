import React from 'react';
import { Box, Button, Flex, Img, Stack, Text } from '@chakra-ui/react';
import { BiErrorCircle, BiRightArrow } from 'react-icons/bi';
import styles from './LandingVideo.module.css';
import { components } from 'src/src/api/typings/api';

interface props {
  landing: components['schemas']['LandingResponse'];
}

export const LandingVideo = ({ landing }: props) => {
  const trailer = landing?.data?.attributes?.trailer?.data?.attributes?.url;
  const logo = landing?.data?.attributes?.logo?.data?.attributes?.url;

  const Blur = {
    filter: 'contrast(88%) brightness(72%)',
  };
  return (
    <Box as='section' className={styles.landingContainer}>
      <video
        src={`https://api-gratflix.onrender.com${trailer}`}
        style={Blur}
        className={styles.blockClick}
        muted
        playsInline
        autoPlay
        loop
        controls
      />
      <Stack className={styles.stackContainer}>
        <Img w='25%' src={`https://api-gratflix.onrender.com${logo}`} mb={7} />
        <Flex alignItems='center' gap={6}>
          <Button variant='outline' className={styles.BtnStyle} color='white' _hover={Blur}>
            <Text p={5}>Regarder</Text>
            <BiRightArrow size='100%' />
          </Button>
          <Button variant='outline' className={styles.BtnStyle} color='white' _hover={Blur}>
            <Text p={5}>Plus d'infos</Text>
            <BiErrorCircle size='100%' />
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};
