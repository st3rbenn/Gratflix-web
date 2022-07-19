import {
  AspectRatio,
  Box,
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
import { components } from 'src/src/api/typings/api';

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
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay ref={ref} />
      <ModalContent bgColor='rgb(20, 20, 20)' color='white' position='relative'>
        <ModalCloseButton zIndex={1000} />
        <AspectRatio ratio={16 / 9}>
          {/* <video src={Trailer} style={Blur} muted playsInline autoPlay loop /> */}
          <Image src={poster} />
        </AspectRatio>
        <Grid pr={20} pl={20} pb={10} pt={10} alignItems='center' gap={4}>
          <Flex alignItems='center' mb={5} gap={6}>
            <Heading fontSize='xl'>{data?.attributes?.title || landing?.data?.attributes?.title}</Heading>
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
