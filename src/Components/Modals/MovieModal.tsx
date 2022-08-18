/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  AspectRatio,
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
import React, {useEffect, useState} from 'react';
import {BiRightArrow} from 'react-icons/bi';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {fetcher} from '../../api/fetcher';
import {components} from '../../api/typings/api';
import MovieCard from '../movie_cards/MovieCards';
import Loader from '../Loader/loader';
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

export const MovieModal = ({isOpen}: modalProps) => {
  const location = useLocation();
  const {movie, landing} = (location.state as locationState) || {};
  const [currentMovie, setCurrentMovie] = useState<
    components['schemas']['MovieResponse']['data'] | components['schemas']['LandingResponse']
  >();
  const [isModal, setIsModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bigPoster, setBigPoster] = useState<string | undefined>();
  const [synopsis, setSynopsis] = useState<string | undefined>();
  const [logo, setLogo] = useState<string | undefined>();
  const [realisators, setRealisators] = useState<components['schemas']['RealisatorListResponse']['data']>();
  const [actors, setActors] = useState<components['schemas']['ActorListResponse']['data']>();
  const [categories, setCategories] = useState<components['schemas']['CategoryListResponse']['data']>();
  const [moreMovie, setMoreMovie] = useState<components['schemas']['MovieListResponse']>();
  const [releaseDate, setReleaseDate] = useState<string | undefined>();
  const [viewTime, setViewTime] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();
  const [movieLink, setMovieLink] = useState<string | undefined>();
  const Navigate = useNavigate();

  const date = (date: string | undefined) => () => {
    const dateSplit = date?.split('-');
    const year = dateSplit?.[0];
    const month = dateSplit?.[1];
    const day = dateSplit?.[2];
    return `${day}-${month}-${year}`;
  };

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
      'pagination[pageSize]': 8,
    };
    const {data: moreMovie} = await getMoreMovie(queryMovie);
    // @ts-ignore
    for (let i = moreMovie?.data?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // @ts-ignore
      [moreMovie[i], moreMovie[j]] = [moreMovie[j], moreMovie[i]];
    }
    if (moreMovie !== undefined) {
      setIsLoaded(true);
      setMoreMovie(moreMovie);
    }
  };

  useEffect(() => {
    seeMoreMovie();
    if (movie !== undefined) {
      setCurrentMovie(movie);
    } else if (landing !== undefined) {
      setCurrentMovie(landing);
    }

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
    if (landing?.data?.attributes?.movie?.data?.attributes?.releasedate !== undefined) {
      setReleaseDate(date(landing?.data?.attributes?.movie?.data?.attributes?.releasedate));
    } else {
      setReleaseDate(date(movie?.attributes?.releasedate));
    }
    setViewTime(movie?.attributes?.viewtime || landing?.data?.attributes?.movie?.data?.attributes?.viewtime);
    setAge(
      // @ts-ignore
      movie?.attributes?.age?.data?.attributes?.age ||
        landing?.data?.attributes?.movie?.data?.attributes?.age?.data?.attributes?.age,
    );
    setMovieLink(movie?.attributes?.URL || landing?.data?.attributes?.movie?.data?.attributes?.URL);
    setIsModal(true);
  }, []);

  const handleClose = () => {
    Navigate(-1);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl">
      <ModalOverlay />
      <ModalContent bgColor="#181818" color="white" position="relative">
        <ModalCloseButton zIndex={1000} />
        <Box position="relative">
          <Box className={styles.image}></Box>
          <AspectRatio ratio={2.12}>
            <Image src={bigPoster} maxW="100%" />
          </AspectRatio>
          <Stack className={styles.stackContainer}>
            <Img w="100%" src={logo} mb={7} />
            <Link to={`/watch/${movie?.id}`} state={{MoviePath: location, currentMovie}}>
              <Button alignSelf="center" variant="solid" _hover={Blur} p="25px" bgColor="#181818">
                <Text alignSelf="center" mr="15px" fontWeight="semibold">
                  Regarder
                </Text>
                <BiRightArrow height="35px" width="35px" />
              </Button>
            </Link>
          </Stack>
        </Box>
        <Box as="main" className={styles.modalContainer}>
          <Flex as="section" justifyContent="space-between" flexWrap="wrap">
            <Flex className={styles.topContainer}>
              <Flex flexDir="row" gap="15px" flexWrap="wrap">
                <Flex className={styles.textContainer} color="gray.400">
                  date de sortie:
                  <Text className={styles.text}>{releaseDate}</Text>
                </Flex>
                <Flex className={styles.textContainer} color="gray.400">
                  durée:
                  <Text className={styles.text}>{viewTime}</Text>
                </Flex>
                <Text className={`${styles.listItems} ${styles.age}`}>{age}</Text>
              </Flex>
              <Text fontSize="15px" fontWeight="semibold">
                {`${synopsis?.slice(0, 315)}...`}
              </Text>
            </Flex>
            <Flex className={styles.sideContainer}>
              <Flex className={styles.sideItemsContainer} mb="15px">
                <Text color="gray.400" fontSize="14px">
                  genre:
                </Text>
                {categories?.map((category: components['schemas']['CategoryResponse']['data']) => (
                  <Text className={styles.listItems} fontWeight="semibold" key={category?.attributes?.categorie}>
                    <Link to={`?categorie=${category?.attributes?.categorie}`}>{category?.attributes?.categorie}</Link>
                  </Text>
                ))}
              </Flex>
              <Flex className={styles.sideItemsContainer} mb="15px">
                <Text color="gray.400" fontSize="14px">
                  acteurs:
                </Text>
                {actors?.map((actor: components['schemas']['ActorResponse']['data']) => (
                  <Text className={styles.listItems} fontWeight="semibold" key={actor?.attributes?.fullname}>
                    <Link to={`?acteur=${actor?.attributes?.fullname}`}>{actor?.attributes?.fullname}</Link>
                  </Text>
                ))}
              </Flex>
              <Flex className={styles.sideItemsContainer}>
                <Text color="gray.400" fontSize="14px">
                  realisateur:
                </Text>
                {realisators?.map((realisator: components['schemas']['RealisatorResponse']['data']) => (
                  <Text className={styles.listItems} fontWeight="semibold" key={realisator?.attributes?.fullname}>
                    <Link to={`/?realisateur=${realisator?.attributes?.fullname}`}>
                      {realisator?.attributes?.fullname}
                    </Link>
                  </Text>
                ))}
              </Flex>
            </Flex>
          </Flex>
          <Flex as="section" className={styles.seeMoreMovie}>
            <Box mb={5}>
              <Heading size="md">A voir aussi</Heading>
            </Box>
            <Grid gridTemplateColumns="repeat(4, 1fr)" gap={6}>
              {isLoaded ? (
                moreMovie?.data?.map((movie: components['schemas']['MovieResponse']['data']) => {
                  return (
                    <GridItem key={movie?.id}>
                      <MovieCard movie={movie} isModal={isModal} />
                    </GridItem>
                  );
                })
              ) : (
                <Loader />
              )}
            </Grid>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  );
};
const Blur = {
  filter: 'contrast(88%) brightness(72%)',
};
