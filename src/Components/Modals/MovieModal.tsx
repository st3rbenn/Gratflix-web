import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
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
import { useEffect, useState } from 'react';
import { BiRightArrow } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetcher } from '../../api/fetcher';
import { components } from 'src/src/api/typings/api';
import MovieCard from '../Cards/MovieCards';
import styles from './modal.module.css';

interface modalProps {
  isOpen: boolean;
}

interface locationState {
  movie?: components['schemas']['MovieResponse']['data'];
  landing?: components['schemas']['LandingResponse'];
  background: {
    pathname: string;
    search: string;
  };
}

export const MovieModal = ({ isOpen }: modalProps) => {
  const location = useLocation();
  const { movie, landing } = (location.state as locationState) || {};
  const [bigPoster, setBigPoster] = useState<string | undefined>();
  const [synopsis, setSynopsis] = useState<string | undefined>();
  const [logo, setLogo] = useState<string | undefined>();
  const [realisators, setRealisators] = useState<components['schemas']['RealisatorListResponse']['data']>();
  const [actors, setActors] = useState<components['schemas']['ActorListResponse']['data']>();
  const [categories, setCategories] = useState<components['schemas']['CategoryListResponse']['data']>();
  const [moreMovie, setMoreMovie] = useState<components['schemas']['MovieListResponse']>();
  const Navigate = useNavigate();
  useEffect(() => {
    if (movie != undefined) {
      setLogo(movie?.attributes?.Logo?.data?.attributes?.url);
      setBigPoster(movie?.attributes?.bigposter?.data?.attributes?.url);
      setSynopsis(movie?.attributes?.Synopsis);
      setCategories(movie?.attributes?.categories?.data);
      setActors(movie?.attributes?.actors?.data);
      setRealisators(movie?.attributes?.realisators?.data);
    } else if (landing !== undefined) {
      setLogo(landing?.data?.attributes?.movie?.data?.attributes?.Logo?.data?.attributes?.url);
      setBigPoster(landing?.data?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url);
      setSynopsis(landing?.data?.attributes?.movie?.data?.attributes?.Synopsis);
      setCategories(landing?.data?.attributes?.movie?.data?.attributes?.categories?.data);
      setActors(landing?.data?.attributes?.movie?.data?.attributes?.actors?.data);
      setRealisators(landing?.data?.attributes?.movie?.data?.attributes?.realisators?.data);
    }
  }, []);
  const seeMoreMovie = async () => {
    const getMoreMovie = fetcher.path('/movies').method('get').create();
    const queryMovie = {
      populate: 'category',
      'populate[0]': 'poster',
      'populate[1]': 'bigposter',
      'populate[2]': 'Logo',
      'populate[3]': 'trailer',
      'populate[4]': 'actors',
      'populate[5]': 'categories',
      'filters[categories]':
        movie?.attributes?.categories?.data?.[0]?.id ||
        landing?.data?.attributes?.movie?.data?.attributes?.categories?.data?.[0]?.id,
      'filters[actors]':
        movie?.attributes?.actors?.data?.[0]?.id ||
        landing?.data?.attributes?.movie?.data?.attributes?.actors?.data?.[0]?.id,
      'pagination[pageSize]': 4,
    };
    const { data: moreMovie } = await getMoreMovie(queryMovie);
    setMoreMovie(moreMovie);
  };

  useEffect(() => {
    seeMoreMovie();
  }, []);

  const handleClose = () => {
    Navigate(-1);
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={['3xl']}>
      <ModalOverlay />
      <ModalContent bgColor='#181818' color='white' position='relative'>
        <ModalCloseButton zIndex={1000} />
        <Box position='relative'>
          <Box className={styles.image}></Box>
          <Image src={bigPoster} w={850} h={422} maxW='100%' />
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
        <Flex as='section' className={styles.modalContainer}>
          <Flex justifyContent='center' alignItems='center' w='60%' mr='23%'>
            <Text fontSize='14px' fontWeight='semibold'>
              {`${synopsis?.slice(0, 198)}...`}
            </Text>
          </Flex>
          <Flex justifyContent='flex-start' flexDir='column'>
            <Flex flexDir='column' alignItems='flex-start' mb='15px'>
              <Text color='gray.400' fontSize='14px'>
                genre:
              </Text>
              {categories?.map((category) => (
                <Text color='white' fontSize='13px' fontWeight='semibold' key={category?.attributes?.categorie}>
                  <Link to={`?categorie=${category?.attributes?.categorie}`}>{category?.attributes?.categorie}</Link>
                </Text>
              ))}
            </Flex>
            <Flex flexDir='column' alignItems='flex-start' mb='15px'>
              <Text color='gray.400' fontSize='14px'>
                acteurs:
              </Text>
              {actors?.map((actor) => (
                <Text color='white' fontSize='13px' fontWeight='semibold' key={actor?.attributes?.fullname}>
                  <Link to={`?acteur=${actor?.attributes?.fullname}`}>{actor?.attributes?.fullname}</Link>
                </Text>
              ))}
            </Flex>
            <Flex flexDir='column' alignItems='flex-start'>
              <Text color='gray.400' fontSize='14px'>
                realisateur:
              </Text>
              {realisators?.map((realisator) => (
                <Text color='white' fontSize='13px' fontWeight='semibold' key={realisator?.attributes?.fullname}>
                  <Link to={`/?realisateur=${realisator?.attributes?.fullname}`}>
                    {realisator?.attributes?.fullname}
                  </Link>
                </Text>
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex as='section' flexDir='column' className={styles.seeMoreMovie} mb='15px'>
          <Box mb={5}>
            <Heading size='md'>A voir aussi</Heading>
          </Box>
          <Grid gridTemplateColumns='repeat(4, 1fr)' gap={6}>
            {moreMovie?.data?.map((movie: components['schemas']['MovieResponse']['data']) => {
              return (
                <GridItem key={movie?.id}>
                  <Link
                    to={`?movie=${movie?.attributes?.title?.split(' ').join('-')}`}
                    state={{ background: location, movie }}
                    className={styles.boxSettings}>
                    <MovieCard movie={movie} />
                  </Link>
                </GridItem>
              );
            })}
          </Grid>
        </Flex>
      </ModalContent>
    </Modal>
  );
};
