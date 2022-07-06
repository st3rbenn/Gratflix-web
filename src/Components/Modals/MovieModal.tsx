import {
  AspectRatio,
  Box,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import Trailer from '../../../assets/trailer.mp4';

interface props {
  isOpen: boolean;
  onClose: () => void;
  data: [];
}

export const MovieModal = (props: props) => {
  const { isOpen, onClose, data } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
      <ModalOverlay />
      <ModalContent bgColor='rgb(20, 20, 20)' color='white' position='relative'>
        <ModalCloseButton />
        <AspectRatio ratio={16 / 9}>
          {/* <video src={Trailer} style={Blur} muted playsInline autoPlay loop /> */}
        </AspectRatio>
        <Grid pr={20} pl={20} pb={10} pt={10} alignItems='center' gap={4}>
          <Flex alignItems='center' mb={5} gap={6}>
            <Heading fontSize='xl'>{data}</Heading>
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
