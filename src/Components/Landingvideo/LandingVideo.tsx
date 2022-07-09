import React from 'react';
import { Box, Button, ChakraProps, Flex, Img, Stack, Text } from '@chakra-ui/react';
import { BiErrorCircle, BiRightArrow } from 'react-icons/bi';
import styles from './LandingVideo.module.css';

interface props {
  trailer: string;
  logo: string;
}

export const LandingVideo = (props: props) => {
  const { trailer, logo } = props;
  return (
    <Box {...(section as ChakraProps)} className={styles.section}>
      <div className={styles.blockClick}>
        <video
          src={'https://strapi-5261.onrender.com' + trailer}
          className={styles.blur}
          muted
          playsInline
          autoPlay
          loop
          controls
        />
      </div>
      <Stack justifyContent='center' position='absolute' top='50%' left='4%'>
        <Img w='25%' mb={7} src={'https://strapi-5261.onrender.com' + logo} />
        <Flex alignItems='center' gap={6}>
          <Button
            className={styles.button}
            variant='outline'
            height='10%'
            width='15%'
            onClick={() => console.log('regardez le film')}>
            <Text p={3}>Regarder</Text>
            <BiRightArrow size={'20%'} />
          </Button>
          <Button className={styles.button} variant='outline' onClick={() => console.log('en savoir plus')}>
            <Text p={3}>Plus d'infos</Text>
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
