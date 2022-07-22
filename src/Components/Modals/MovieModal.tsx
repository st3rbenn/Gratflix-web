import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { BiRightArrow } from 'react-icons/bi';
import { components } from 'src/src/api/typings/api';
import styles from './modal.module.css';

interface props {
  isOpen: boolean;
  onClose: () => void;
  data?: components['schemas']['MovieResponse']['data'];
  landing?: components['schemas']['LandingResponse'];
}

export const MovieModal = (props: props) => {
  const { isOpen, onClose, data, landing } = props;
  const homePoster = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    data?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
  }`;
  const landingPoster = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    landing?.data?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
  }`;
  const ref = useRef<HTMLDivElement>(null);
  console.log(landingPoster);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  const synopsis = () => {
    if (data?.attributes?.Synopsis) {
      return data?.attributes?.Synopsis;
    } else if (landing?.data?.attributes?.movie?.data?.attributes?.Synopsis) {
      return landing?.data?.attributes?.movie?.data?.attributes?.Synopsis;
    } else {
      // eslint-disable-next-line prettier/prettier
      return 'quelqu\'un a déjà vu ce film ?';
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
      <ModalOverlay ref={ref} />
      <ModalContent bgColor='#181818' color='white' position='relative'>
        <ModalCloseButton zIndex={1000} />
        {/* <AspectRatio ratio={16 / 9} className={styles.image}>
          {/* <video src={Trailer} style={Blur} muted playsInline autoPlay loop />
        </AspectRatio> */}
        <Box position='relative'>
          <Box className={styles.image}></Box>
          <Image src={homePoster || landingPoster} />
        </Box>
        <Grid as='section' className={styles.modalContainer}>
          <Flex alignItems='flex-start' mb={5} gap={6} flexDir='column' maxW='50%'>
            <Heading fontSize='lg'>{data?.attributes?.title}</Heading>
            <Text textAlign='left' fontSize='12px' fontWeight='bold'>
              {synopsis()}
            </Text>
          </Flex>
          <Flex>
            <Button
              variant='outline'
              className={styles.BtnStyle}
              color='white'
              _hover={Blur}
              style={{ zIndex: 'auto', maxWidth: '178px' }}>
              <Text p={5}>Regarder</Text>
              <BiRightArrow size='100%' />
            </Button>
            <Button
              variant='outline'
              className={styles.BtnStyle}
              color='white'
              _hover={Blur}
              style={{ zIndex: 'auto', maxWidth: '178px' }}>
              <Text p={5}>Partager</Text>
              <BiRightArrow size='100%' />
            </Button>
          </Flex>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

const Blur = {
  filter: 'contrast(75%) brigthness(50%)',
  zIndex: '-1',
};
