import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Img,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { BiRightArrow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { components } from 'src/src/api/typings/api';
import styles from './modal.module.css';

interface modalProps {
  isOpen: boolean;
  onClose?: () => void;
  data?: components['schemas']['MovieResponse']['data'];
  landing?: components['schemas']['LandingResponse'];
}

export const MovieModal = ({ isOpen, data, landing }: modalProps) => {
  const Navigate = useNavigate();
  const homePoster = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    data?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
  }`;
  const landingPoster = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    landing?.data?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
  }`;
  const logo = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    data?.attributes?.Logo?.data?.attributes?.url?.split('/')[3]
  }`;
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    Navigate(-1);
  };

  const synopsis = () => {
    if (data?.attributes?.Synopsis) {
      return data?.attributes?.Synopsis;
    } else if (landing?.data?.attributes?.movie?.data?.attributes?.Synopsis) {
      return landing?.data?.attributes?.movie?.data?.attributes?.Synopsis;
    }
    // eslint-disable-next-line prettier/prettier
    return 'quelqu\'un a déjà vu ce film ?';
  };
  console.log(data?.attributes);
  return (
    <Modal isOpen={isOpen} onClose={handleClose} size='5xl'>
      <ModalOverlay ref={ref} />
      <ModalContent bgColor='#181818' color='white' position='relative'>
        <ModalCloseButton zIndex={1000} onClick={() => handleClose} />
        <Box position='relative'>
          <Box className={styles.image}></Box>
          <Image src={(landing && landingPoster) || (data && homePoster)} w={1152} h={576} />
          <Stack className={styles.stackContainer}>
            <Img w='100%' src={logo} mb={7} />
            <Flex alignItems='center' gap={6}>
              <Button variant='solid' bgColor='#181818' className={styles.BtnStyle} color='white' w='max-content'>
                <Text p={5}>Regarder</Text>
                <BiRightArrow size='100%' />
              </Button>
            </Flex>
          </Stack>
        </Box>
        <Grid as='section' className={styles.modalContainer} gridTemplateColumns='1fr 1fr'>
          <Flex alignItems='flex-start' mb={5} gap={6} flexDir='column'>
            <Heading fontSize='lg'>
              {data?.attributes?.title || landing?.data?.attributes?.movie?.data?.attributes?.title}
            </Heading>
            <Text textAlign='left' fontSize='12px' fontWeight='bold'>
              {synopsis()}
            </Text>
          </Flex>
          <Flex alignItems='flex-start' mb={5} gap={6} flexDir='column'>
            {data?.attributes?.category?.data?.attributes?.categorie as string}
          </Flex>
        </Grid>
      </ModalContent>
    </Modal>
  );
};
