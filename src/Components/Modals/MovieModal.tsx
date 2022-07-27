/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { components } from '../../api/typings/api';
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
  const [isModal, setIsModal] = useState(false);
  const [bigPoster, setBigPoster] = useState<string | undefined>();
  const [synopsis, setSynopsis] = useState<string | undefined>();
  const [logo, setLogo] = useState<string | undefined>();
  const [realisators, setRealisators] = useState<components['schemas']['RealisatorListResponse']['data']>();
  const [actors, setActors] = useState<components['schemas']['ActorListResponse']['data']>();
  const [categories, setCategories] = useState<components['schemas']['CategoryListResponse']['data']>();
  const [moreMovie, setMoreMovie] = useState<components['schemas']['MovieListResponse']>();
  const [releaseDate, setReleaseDateDate] = useState<string | undefined>();
  const [viewTime, setViewTime] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();
  const Navigate = useNavigate();

  useEffect(() => {
    if (movie !== undefined || landing !== undefined) {
      setLogo(
        movie?.attributes?.Logo?.data?.attributes?.url ||
          landing?.data?.attributes?.movie?.data?.attributes?.Logo?.data?.attributes?.url,
      );
      setBigPoster(
        movie?.attributes?.bigposter?.data?.attributes?.url ||
          landing?.data?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url,
      );
      setSynopsis(movie?.attributes?.Synopsis || landing?.data?.attributes?.movie?.data?.attributes?.Synopsis);
      setCategories(
        movie?.attributes?.categories?.data || landing?.data?.attributes?.movie?.data?.attributes?.categories?.data,
      );
      setActors(movie?.attributes?.actors?.data || landing?.data?.attributes?.movie?.data?.attributes?.actors?.data);
      setRealisators(
        movie?.attributes?.realisators?.data || landing?.data?.attributes?.movie?.data?.attributes?.realisators?.data,
      );
      setReleaseDateDate(
        movie?.attributes?.releasedate || landing?.data?.attributes?.movie?.data?.attributes?.releasedate,
      );
      setViewTime(movie?.attributes?.viewtime || landing?.data?.attributes?.movie?.data?.attributes?.viewtime);
      setAge(
        // @ts-ignore
        movie?.attributes?.age?.data?.attributes?.age ||
          landing?.data?.attributes?.movie?.data?.attributes?.age?.data?.attributes?.age,
      );
    }
    setIsModal(true);
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
      'populate[7]': 'age',
      'filters[categories]':
        movie?.attributes?.categories?.data?.[0]?.id ||
        landing?.data?.attributes?.movie?.data?.attributes?.categories?.data?.[0]?.id,
      'filters[actors]':
        movie?.attributes?.actors?.data?.[0]?.id ||
        landing?.data?.attributes?.movie?.data?.attributes?.actors?.data?.[0]?.id,
      'pagination[pageSize]': 4,
    };
    const { data: moreMovie } = await getMoreMovie(queryMovie);
    // @ts-ignore
    for (let i = moreMovie?.data?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // @ts-ignore
      [moreMovie[i], moreMovie[j]] = [moreMovie[j], moreMovie[i]];
    }
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
        <Box as='main' className={styles.modalContainer}>
          <Flex as='section' justifyContent='space-between'>
            <Flex alignItems='flex-start' w='70%' flexDir='column' gap='44px'>
              <Flex flexDir='row' gap='15px'>
                <Flex flexDir='row' gap='8px' color='gray.400' fontSize='14px'>
                  date de sortie:
                  <Text color='white' fontSize='15px' fontWeight='semibold'>
                    {releaseDate}
                  </Text>
                </Flex>
                <Flex flexDir='row' gap='8px' color='gray.400' fontSize='14px'>
                  durée:
                  <Text color='white' fontSize='15px' fontWeight='semibold'>
                    {viewTime}
                  </Text>
                </Flex>
                <Text
                  className={styles.listItems}
                  fontWeight='semibold'
                  border='1px white solid'
                  pr='5px'
                  pl='5px'
                  ml='10px'>
                  {age}
                </Text>
              </Flex>
              <Text fontSize='15px' fontWeight='semibold'>
                {`${synopsis?.slice(0, 315)}...`}
              </Text>
            </Flex>
            <Flex justifyContent='flex-start' flexDir='column'>
              <Flex flexDir='column' alignItems='flex-start' mb='15px'>
                <Text color='gray.400' fontSize='14px'>
                  genre:
                </Text>
                {categories?.map((category: components['schemas']['CategoryResponse']['data']) => (
                  <Text className={styles.listItems} fontWeight='semibold' key={category?.attributes?.categorie}>
                    <Link to={`?categorie=${category?.attributes?.categorie}`}>{category?.attributes?.categorie}</Link>
                  </Text>
                ))}
              </Flex>
              <Flex flexDir='column' alignItems='flex-start' mb='15px'>
                <Text color='gray.400' fontSize='14px'>
                  acteurs:
                </Text>
                {actors?.map((actor: components['schemas']['ActorResponse']['data']) => (
                  <Text className={styles.listItems} fontWeight='semibold' key={actor?.attributes?.fullname}>
                    <Link to={`?acteur=${actor?.attributes?.fullname}`}>{actor?.attributes?.fullname}</Link>
                  </Text>
                ))}
              </Flex>
              <Flex flexDir='column' alignItems='flex-start'>
                <Text color='gray.400' fontSize='14px'>
                  realisateur:
                </Text>
                {realisators?.map((realisator: components['schemas']['RealisatorResponse']['data']) => (
                  <Text className={styles.listItems} fontWeight='semibold' key={realisator?.attributes?.fullname}>
                    <Link to={`/?realisateur=${realisator?.attributes?.fullname}`}>
                      {realisator?.attributes?.fullname}
                    </Link>
                  </Text>
                ))}
              </Flex>
            </Flex>
          </Flex>
          <Flex as='section' className={styles.seeMoreMovie}>
            <Box mb={5}>
              <Heading size='md'>A voir aussi</Heading>
            </Box>
            <Grid gridTemplateColumns='repeat(4, 1fr)' gap={6}>
              {moreMovie?.data?.map((movie: components['schemas']['MovieResponse']['data']) => {
                return (
                  <GridItem key={movie?.id}>
                    <MovieCard movie={movie} isModal={isModal} />
                  </GridItem>
                );
              })}
            </Grid>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  );
};
