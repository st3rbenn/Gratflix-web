import {Flex, Heading} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import MovieCard from '../movie_cards/MovieCards';
import styles from './carousel.module.css';

import {fetcher} from 'src/plexAPI/api';
import {Metadata, RecentlyAdded, Tag} from 'src/plexAPI/type';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  carouselTitle?: string;
  loadingData?: () => void;
}

export function Carousel({carouselTitle}: CarouselProps) {
  const [movies, setMovies] = useState<Metadata[]>();
  const [listTitle, setListTitle] = useState<string>();
  const location = useLocation();

  const handleGetRecentlyAdded = async () => {
    const {data: result} = await fetcher.path('/library/recentlyAdded').method('get').create()({});
    setMovies((result as RecentlyAdded).MediaContainer.Metadata);
    sessionStorage.setItem(
      `CarouselData_${carouselTitle}`,
      JSON.stringify((result as RecentlyAdded).MediaContainer.Metadata),
    );
  };

  const handleGetPerCategory = async (category: string) => {
    let categoryUrl = '';
    const {data: result} = await fetcher.path(`/library/sections/3/${Tag.Genre}`).method('get').create()({});

    (result as any).MediaContainer.Directory.map((item: any) => {
      if (item.title.toLowerCase() === category) {
        categoryUrl = item.fastKey;
      }
    });

    const {data: resultCategoryMovies} = await fetcher.path(categoryUrl).method('get').create()({});
    setMovies((resultCategoryMovies as any).MediaContainer.Metadata);
    sessionStorage.setItem(
      `CarouselData_${carouselTitle}`,
      JSON.stringify((resultCategoryMovies as any).MediaContainer.Metadata),
    );
  };

  const getMovies = async () => {
    switch (carouselTitle?.toLowerCase()) {
      case 'recent':
        await handleGetRecentlyAdded();
        break;
      case 'action':
        await handleGetPerCategory(carouselTitle?.toLowerCase());
        // await handleGetAllLibraries();
        break;
      case 'adventure':
        await handleGetPerCategory(carouselTitle?.toLowerCase());
        break;
      case 'continue':
        break;
      case 'for you':
        break;
      case 'trending':
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem(`CarouselData_${carouselTitle}`) != undefined) {
      setMovies(JSON.parse(sessionStorage.getItem(`CarouselData_${carouselTitle}`) as string));
    } else {
      getMovies();
    }
  }, []);

  useEffect(() => {
    switch (carouselTitle?.toLowerCase()) {
      case 'recent':
        setListTitle('Récemment ajoutés');
        break;
      case 'trending':
        setListTitle('Les plus populaires');
        break;
      case 'for you':
        setListTitle('Pour vous');
        break;
      default:
        break;
    }

    if (listTitle == undefined) {
      setListTitle(carouselTitle);
    }
  }, [movies !== undefined, carouselTitle !== undefined]);

  return (
    <>
      {movies !== undefined && (
        <>
          <Heading size="md" mt={10} ml={3} mb={3} color="white">
            {listTitle}
          </Heading>
        </>
      )}
      <Swiper spaceBetween={10} style={{position: 'relative'}} lazy={true} slidesPerView={7} breakpoints={breakpoint}>
        {movies?.map((movie: Metadata) => (
          <SwiperSlide key={movie?.guid} className={styles.fadeInContainer}>
            <Flex justifyContent="center" alignItems="center">
              <Link to={`?movie=${movie?.title}`} state={{background: location, movie}}>
                <MovieCard movie={movie} />
              </Link>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

const breakpoint = {
  200: {
    slidesPerView: 3,
  },
  630: {
    slidesPerView: 4,
  },
  676: {
    slidesPerView: 5,
  },
  900: {
    slidesPerView: 6,
  },
  1440: {
    slidesPerView: 7,
  },
};

{
  /* <div style={{display: 'flex', justifyContent: 'space-between', position: 'relative'}}>
        <Box style={{position: 'absolute', top: 0, right: 0}}>
          <Image src={arrow} w="50px" h="50px" background="hsla(0,0%,8%,.5)" />
        </Box>
        <Box style={{position: 'absolute', top: 0, left: 0}}>
          <Image src={arrow} w="50px" h="50px" transform="rotate(180deg)" background="hsla(0,0%,8%,.5)" />
        </Box>
      </div> */
}
