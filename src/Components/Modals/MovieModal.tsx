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
  Spacer,
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
  movieLanding?: components['schemas']['LandingResponse']['data'];
}

export const MovieModal = ({ isOpen, movie, movieLanding }: modalProps) => {
  // const [categories, setCategories] = useState([] as components['schemas']['CategoryListResponse']);
  const [categories, setCategories] = useState('');
  const [actors, setActors] = useState([] as components['schemas']['ActorListResponse']);
  const Navigate = useNavigate();
  const homePoster = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    movie?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
  }`;
  const landingPoster = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    movieLanding?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
  }`;
  const logo = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    movie?.attributes?.Logo?.data?.attributes?.url?.split('/')[3]
  }`;
  const ref = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    Navigate(-1);
  };

  useEffect(() => {
    // setCategories(movie?.attributes?.category || movieLanding?.attributes?.movie?.data?.attributes?.category);
    setCategories(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      movie?.attributes?.category?.data?.attributes?.categorie ||
        movieLanding?.attributes?.movie?.data?.attributes?.category?.data?.attributes?.categorie,
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setActors(movie?.attributes?.actors?.data || movieLanding?.attributes?.movie?.data?.attributes?.actors?.data);
  }, [movie, movieLanding]);

  const testions = () => {
    console.log('testions');
  };

  const synopsis = () => {
    if (movie?.attributes?.Synopsis) {
      return movie?.attributes?.Synopsis.slice(0, 170) + '...';
    } else if (movieLanding?.attributes?.movie?.data?.attributes?.Synopsis?.slice(0, 170) + '...') {
      return movieLanding?.attributes?.movie?.data?.attributes?.Synopsis?.slice(0, 170) + '...';
    }
    // eslint-disable-next-line prettier/prettier
    return 'quelqu\'un a déjà vu ce film ?';
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={['3xl']}>
      <ModalOverlay ref={ref} />
      <ModalContent bgColor='#181818' color='white' position='relative'>
        <ModalCloseButton zIndex={1000} onClick={() => handleClose} />
        <Box position='relative'>
          <Box className={styles.image}></Box>
          <Image src={(movieLanding && landingPoster) || (movie && homePoster)} w={850} h={479} maxW='100%' />
          <Stack className={styles.stackContainer}>
            <Img w='100%' src={logo} mb={7} />
            <Flex alignItems='center' gap={6}>
              <Button
                variant='solid'
                bgColor='#181818'
                className={styles.BtnStyle}
                color='white'
                w='max-content'
                onClick={() => testions()}>
                <Text p={5}>Regarder</Text>
                <BiRightArrow size='100%' />
              </Button>
            </Flex>
          </Stack>
        </Box>
        <Flex as='section' className={styles.modalContainer} flexDir='row' p={10}>
          <Flex justifyContent='center' alignItems='center' w='60%' mr='23%'>
            <Text fontSize='14px' fontWeight='bold'>
              {synopsis()}
            </Text>
          </Flex>
          <Flex justifyContent='flex-start' flexDir='column'>
            <Flex flexDir='column' alignItems='flex-start'>
              <Text color='gray.400'>genre:</Text>
              <Text>
                <Link to={`/categorie/${categories}`}>{categories}</Link>
              </Text>
            </Flex>
            <Flex flexDir='column' alignItems='flex-start'>
              <Text color='gray.400'>acteurs:</Text>
              {actors?.data?.map((actor) => {
                console.log(actor);
                return (
                  <Text color='white' fontWeight='bold' key={actor?.attributes?.fullname}>
                    <Link to={`/acteur/${actor?.attributes?.fullname}`}>{actor?.attributes?.fullname}</Link>
                  </Text>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};
//{actors &&
//actors?.data?.map((actor: components['schemas']['ActorResponse']['data']) => (
//  <Text color='white' fontWeight='bold' key={actor?.attributes?.fullname}>
//    <Link to={`/acteur/${actor?.attributes?.fullname}`}>{actor?.attributes?.fullname}</Link>
//  </Text>
//))}
//{categories &&
//  categories?.data?.map((categorie: components['schemas']['CategoryResponse']['data']) => (
//    <Text color='white' fontWeight='bold' key={categorie?.attributes?.categorie}>
//      <Link to={`/acteur/${categorie?.attributes?.categorie}`}>{categorie?.attributes?.categorie}</Link>
//    </Text>
//  ))}
