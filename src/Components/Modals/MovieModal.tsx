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
  const poster =
    data?.attributes?.bigposter?.data?.attributes?.url || landing?.data?.attributes?.Poster?.data?.attributes?.url;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
      <ModalOverlay ref={ref} />
      <ModalContent bgColor='#181818' color='white' position='relative'>
        <ModalCloseButton zIndex={1000} />
        {/* <AspectRatio ratio={16 / 9} className={styles.image}>
          {/* <video src={Trailer} style={Blur} muted playsInline autoPlay loop />
        </AspectRatio> */}
        <Box position='relative'>
          <Box className={styles.image}></Box>
          <Image src={poster} />
        </Box>
        <Grid pr={20} pl={20} pb={10} pt={10} alignItems='center' gap={4}>
          <Flex alignItems='flex-start' mb={5} gap={6} flexDir='column'>
            <Heading fontSize='lg'>
              A propos de{' '}
              <span style={{ fontWeight: 'bold' }}>{data?.attributes?.title || landing?.data?.attributes?.title}</span>
            </Heading>
            <Text textAlign='left' fontSize='12px' fontWeight='bold'>
              {data?.attributes?.Synopsis?.slice(0, 300) + '...'}
            </Text>
          </Flex>
          <Button
            variant='outline'
            className={styles.BtnStyle}
            color='white'
            w='max-content'
            _hover={Blur}
            style={{ zIndex: 'auto' }}>
            <Text p={5}>Regarder</Text>
            <BiRightArrow size='100%' />
          </Button>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

const Blur = {
  filter: 'contrast(75%) brigthness(50%)',
  zIndex: '-1',
};
