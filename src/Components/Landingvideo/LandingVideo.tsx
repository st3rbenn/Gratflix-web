import React from 'react';
import { Box, Button, ChakraProps, Flex, Img, Stack } from '@chakra-ui/react';
import { BiErrorCircle, BiRightArrow } from 'react-icons/bi';
import styles from './LandingVideo.module.css';
import { components } from 'src/src/api/typings/api';

interface props {
  landing: components['schemas']['LandingResponse'];
}

export const LandingVideo = (props: props) => {
  const trailer = props?.landing?.data?.attributes?.trailer?.data?.attributes?.url;
  const logo = props?.landing?.data?.attributes?.logo?.data?.attributes?.url;
  return (
    <Box {...(section as ChakraProps)} className={styles.section}>
      <div className={styles.blockClick}>
        <video
          src={'https://api-gratflix.onrender.com' + trailer}
          className={styles.blur}
          muted
          playsInline
          autoPlay
          loop
          controls
        />
      </div>
      <Stack justifyContent='center' position='absolute' top='50%' left='4%'>
        <Img w='25%' mb={7} src={'https://api-gratflix.onrender.com' + logo} />
        <Flex alignItems='center' gap={6}>
          <Button
            className={styles.button}
            variant='outline'
            height='10%'
            width='15%'
            onClick={() => console.log('regardez le film')}>
            {/* <Text p={3}>Regarder</Text> */}
            <BiRightArrow size={'20%'} />
          </Button>
          <Button className={styles.button} variant='outline' onClick={() => console.log('en savoir plus')}>
            {/* <Text p={3}>Plus d'infos</Text> */}
            <BiErrorCircle size='20%' />
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

const section = {
  as: 'section',
};
