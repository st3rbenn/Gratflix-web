import {
  Box,
  Button,
  Flex,
  Image,
  Img,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { BiRightArrow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { components } from 'src/src/api/typings/api';
import styles from './modal.module.css';

interface modalProps {
  isOpen: boolean;
  onClose?: () => void;
  movie?: components['schemas']['MovieResponse']['data'];
  movieLanding?: components['schemas']['LandingResponse'];
}

export const MovieModal = ({ isOpen, movie, movieLanding }: modalProps) => {
  const [bigPoster, setBigPoster] = useState<string | undefined>();
  const [synopsis, setSynopsis] = useState<string | undefined>();
  const [logo, setLogo] = useState<string | undefined>();
  const [actors, setActors] = useState([] as components['schemas']['ActorListResponse']['data']);
  const [categories, setCategories] = useState([] as components['schemas']['CategoryListResponse']['data']);
  const Navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (movie != undefined) {
      setLogo(movie?.attributes?.Logo?.data?.attributes?.url);
      setBigPoster(movie?.attributes?.bigposter?.data?.attributes?.url);
      setSynopsis(movie?.attributes?.Synopsis);
      setCategories(movie?.attributes?.categories?.data);
      setActors(movie?.attributes?.actors?.data);
    } else if (movieLanding !== undefined) {
      setLogo(movieLanding?.data?.attributes?.movie?.data?.attributes?.Logo?.data?.attributes?.url);
      setBigPoster(movieLanding?.data?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url);
      setSynopsis(movieLanding?.data?.attributes?.movie?.data?.attributes?.Synopsis);
      setCategories(movieLanding?.data?.attributes?.movie?.data?.attributes?.categories?.data);
      setActors(movieLanding?.data?.attributes?.movie?.data?.attributes?.actors?.data);
    }
  }, []);

  const handleClose = () => {
    Navigate(-1);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={['3xl']}>
      <ModalOverlay ref={ref} />
      <ModalContent bgColor='#181818' color='white' position='relative'>
        <ModalCloseButton zIndex={1000} onClick={() => handleClose} />
        <Box position='relative'>
          <Box className={styles.image}></Box>
          <Image src={bigPoster} w={850} h={479} maxW='100%' />
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
        <Flex as='section' className={styles.modalContainer} flexDir='row' p={10}>
          <Flex justifyContent='center' alignItems='center' w='60%' mr='23%'>
            <Text fontSize='14px' fontWeight='bold'>
              {synopsis}
            </Text>
          </Flex>
          <Flex justifyContent='flex-start' flexDir='column'>
            <Flex flexDir='column' alignItems='flex-start'>
              <Text color='gray.400'>genre:</Text>
              {categories?.map((category) => (
                <Text color='white' fontWeight='bold' key={category?.attributes?.categorie}>
                  <Link to={`/categorie/${category?.attributes?.categorie}`}>{category?.attributes?.categorie}</Link>
                </Text>
              ))}
            </Flex>
            <Flex flexDir='column' alignItems='flex-start'>
              <Text color='gray.400'>acteurs:</Text>
              {actors?.map((actor) => (
                <Text color='white' fontWeight='bold' key={actor?.attributes?.fullname}>
                  <Link to={`/acteur/${actor?.attributes?.fullname}`}>{actor?.attributes?.fullname}</Link>
                </Text>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};
