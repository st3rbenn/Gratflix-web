import React from 'react';
import { Box, Button, ChakraProps, Flex, Img, Stack, Text } from '@chakra-ui/react';
import { BiErrorCircle, BiRightArrow } from 'react-icons/bi';
import Trailer from '../../assets/Spider-Man_Homecoming.mp4';
import currentMovieLogo from '../../assets/img/spiderman-logo.jpg';

export const LandingVideo = () => {
  return (
    <Box {...(section as ChakraProps)}>
      <Box position='absolute' zIndex={1000} w='100%' height='100%'></Box>
      <video src={Trailer} style={Blur} muted playsInline autoPlay loop controls />
      <Stack justifyContent='center' position='absolute' top='50%' left='4%'>
        <Img w='25%' mb={7} src={currentMovieLogo} />
        <Flex alignItems='center' gap={6}>
          <Button
            {...(BtnStyle as ChakraProps)}
            height='10%'
            width='15%'
            onClick={() => console.log('regardez le film')}>
            <Text p={3}>Regarder</Text>
            <BiRightArrow size={'20%'} />
          </Button>
          <Button {...(BtnStyle as ChakraProps)} onClick={() => console.log('en savoir plus')}>
            <Text p={3}>Plus d'infos</Text>
            <BiErrorCircle size={'20%'} />
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

const section = {
  as: 'section',
  w: '100%',
  h: '100%',
  position: 'relative',
  zIndex: 100,
};

const Blur = {
  filter: 'contrast(88%) brightness(72%)',
};

const BtnStyle = {
  color: 'rgb(255, 255, 255)',
  variant: 'outline',
  justifyContent: 'center',
  alignItems: 'center',
  mt: '0 !important',
  height: '10%',
  width: '15%',
};
