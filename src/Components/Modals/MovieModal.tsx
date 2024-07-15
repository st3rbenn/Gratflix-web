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
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {BiRightArrow} from 'react-icons/bi';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Loader from 'src/Components/Loader/loader';
import {Genre, Metadata, Role, Writer} from 'src/plexAPI/type';
// import {components} from '../../api/typings/api';
import {imageFetcher} from 'src/plexAPI/api';
import MovieCard from '../movie_cards/MovieCards';
import styles from './modal.module.css';
import SideContainer from './SideContainer';

interface modalProps {
  isOpen: boolean;
}

interface locationState {
  movie?: Metadata;
  landing?: Metadata;
  background: {
    pathname: string;
    search: string;
  };
}

const calculateViewTime = (time: number) => () => {
  let totalSeconds = Math.floor(time / 1000);

  const hours = Math.floor(totalSeconds / 3600);

  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);

  // Format the result as a string
  return `${hours}h${minutes.toString().padStart(2, '0')}`;
};

export const MovieModal = ({isOpen}: modalProps) => {
  const location = useLocation();
  const {movie, landing} = (location.state as locationState) || {};
  const [currentMovie, setCurrentMovie] = useState<Metadata>();
  const [isModal, setIsModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bigPoster, setBigPoster] = useState<string | undefined>();
  const [synopsis, setSynopsis] = useState<string | undefined>();
  const [realisators, setRealisators] = useState<Writer[]>();
  const [actors, setActors] = useState<Role[]>();
  const [categories, setCategories] = useState<Genre[]>();
  const [moreMovie, setMoreMovie] = useState<Metadata[]>();
  const [releaseDate, setReleaseDate] = useState<string | undefined>();
  const [viewTime, setViewTime] = useState<string | undefined>();
  const [age, setAge] = useState<string | undefined>();
  const [movieLink, setMovieLink] = useState<string | undefined>();
  const Navigate = useNavigate();

  // const seeMoreMovie = async () => {
  //   const getMoreMovie = fetcher.path('/movies').method('get').create();
  //   const queryMovie = {
  //     populate: 'category',
  //     'populate[0]': 'poster',
  //     'populate[1]': 'bigposter',
  //     'populate[2]': 'Logo',
  //     'populate[3]': 'trailer',
  //     'populate[4]': 'actors',
  //     'populate[5]': 'categories',
  //     'populate[7]': 'age',
  //     'filters[categories]':
  //       movie?.attributes?.categories?.data?.[0]?.id ||
  //       landing?.data?.attributes?.movie?.data?.attributes?.categories?.data?.[0]?.id,
  //     'filters[actors]':
  //       movie?.attributes?.actors?.data?.[0]?.id ||
  //       landing?.data?.attributes?.movie?.data?.attributes?.actors?.data?.[0]?.id,
  //     'pagination[pageSize]': 8,
  //   };
  //   const {data: moreMovie} = await getMoreMovie(queryMovie);
  //   // @ts-ignore
  //   for (let i = moreMovie?.data?.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     // @ts-ignore
  //     [moreMovie[i], moreMovie[j]] = [moreMovie[j], moreMovie[i]];
  //   }
  //   if (moreMovie !== undefined) {
  //     setIsLoaded(true);
  //     setMoreMovie(moreMovie);
  //   }
  // };

  const handleGetMovieArt = async (artPath: string) => {
    try {
      const response = await imageFetcher({
        url: artPath,
      });
      if (response) {
        const blob = new Blob([response.data], {type: 'image/jpeg'});
        const url = URL.createObjectURL(blob);
        setBigPoster(url);
      } else {
        console.warn('No data returned from API');
      }
    } catch (error) {
      console.error('Error fetching movie art:', error);
    }
  };

  useEffect(() => {
    // seeMoreMovie();
    if (movie !== undefined) {
      setCurrentMovie(movie);
    } else if (landing !== undefined) {
      console.log('LANDING', landing);
      setCurrentMovie(landing);
    }
    handleGetMovieArt((movie?.art as string) || (landing?.art as string));
    setSynopsis(movie?.summary || landing?.summary);
    setCategories(movie?.Genre || landing?.Genre);
    setActors(movie?.Role || landing?.Role);
    setRealisators(movie?.Writer || landing?.Writer);
    setReleaseDate(movie?.year.toString() || landing?.year.toString());
    setViewTime(calculateViewTime((movie?.duration as number) || (landing?.duration as number)));
    // setMovieLink(movie?.attributes?.URL || landing?.data?.attributes?.movie?.data?.attributes?.URL);
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
            <Link to={`/watch/${movie?.guid}`} state={{MoviePath: location, currentMovie}}>
              <Button alignSelf="center" variant="solid" _hover={Blur} p="25px" bgColor="#181818" color="white">
                <Text alignSelf="center" mr="15" fontWeight="semibold">
                  Regarder
                </Text>
                <BiRightArrow height="35px" width="35px" />
              </Button>
            </Link>
          </Stack>
        </Box>
        <Box as="main" className={styles.modalContainer}>
          <Heading size="md">{movie?.title}</Heading>
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
                {age !== undefined && <Text className={`${styles.listItems} ${styles.age}`}>{age}</Text>}
              </Flex>
              <Text fontSize="15px" fontWeight="semibold" mb={20}>
                {`${synopsis?.slice(0, 500)}...`}
              </Text>
            </Flex>
            <SideContainer categories={categories} actors={actors} realisators={realisators} />
          </Flex>
          <Flex as="section" className={styles.seeMoreMovie}>
            <Box mb={5}>
              <Heading size="md">A voir aussi</Heading>
            </Box>
            <Grid gridTemplateColumns="repeat(4, 1fr)" gap={6}>
              {isLoaded ? (
                moreMovie?.map((movie: Metadata) => {
                  return (
                    <GridItem key={movie?.guid}>
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
