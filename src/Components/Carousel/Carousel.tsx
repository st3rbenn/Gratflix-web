import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Heading, Flex, Image, Box} from '@chakra-ui/react';
import {fetcher} from '../../api/fetcher';
import {components} from '../../api/typings/api';
import MovieCard from '../Cards/MovieCards';
import arrow from '../../assets/img/arrow.svg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';

interface CarouselProps {
  getMovieFromCategory?: number | string;
  carouselTitle?: string;
  loadingData?: () => void;
}

export function Carousel({getMovieFromCategory, carouselTitle}: CarouselProps) {
  const [movies, setMovies] = useState<components['schemas']['MovieListResponse']>();
  const [listTitle, setListTitle] = useState<string>();

  const getMovies = async () => {
    const getMovie = fetcher.path('/movies').method('get').create();
    let queryMovie: object = {};
    if (getMovieFromCategory !== undefined) {
      queryMovie = {
        populate: 'category',
        'populate[0]': 'poster',
        'populate[1]': 'bigposter',
        'populate[2]': 'Logo',
        'populate[3]': 'trailer',
        'populate[4]': 'actors',
        'populate[5]': 'categories',
        'populate[6]': 'realisators',
        'populate[7]': 'age',
        'filters[categories]': getMovieFromCategory,
        'pagination[pageSize]': 12,
      };
    }
    if (carouselTitle !== undefined) {
      if (carouselTitle === 'recent') {
        queryMovie = {
          populate: 'poster',
          'populate[0]': 'bigposter',
          'populate[1]': 'categories',
          'populate[2]': 'Logo',
          'populate[3]': 'trailer',
          'populate[4]': 'actors',
          'populate[5]': 'realisators',
          'populate[6]': 'age',
          sort: 'publishedAt:desc',
          'pagination[pageSize]': 12,
        };
      }
    }

    const {data: moviesArray} = await getMovie(queryMovie);
    setMovies(moviesArray);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (carouselTitle !== undefined) {
      if (carouselTitle === 'recent') {
        setListTitle('Récemment ajoutés');
      } else if (carouselTitle === 'trending') {
        setListTitle('Les plus populaires');
      } else if (carouselTitle === 'for you') {
        setListTitle('Pour vous');
      }
    } else {
      const title = movies?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.categorie;
      setListTitle(title);
    }
  }, [movies !== undefined, carouselTitle !== undefined]);
  return (
    <>
      <Heading size="md" mt={7} ml={3} mb={2} color="white">
        {listTitle}
      </Heading>
      <Swiper spaceBetween={10} style={{position: 'relative'}} slidesPerView="auto" lazy breakpoints={breakpoint}>
        <div style={{display: 'flex', justifyContent: 'space-between', position: 'relative'}}>
          <Box style={{position: 'absolute', top: 0, right: 0}}>
            <Image src={arrow} w="50px" h="50px" background="hsla(0,0%,8%,.5)" />
          </Box>
          <Box style={{position: 'absolute', top: 0, left: 0}}>
            <Image src={arrow} w="50px" h="50px" transform="rotate(180deg)" background="hsla(0,0%,8%,.5)" />
          </Box>
        </div>
        {movies &&
          movies?.data?.map((movie: components['schemas']['MovieResponse']['data']) => (
            <SwiperSlide key={movie?.id}>
              <Flex justifyContent="center" alignItems="center">
                <MovieCard movie={movie} />
              </Flex>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

const breakpoint = {
  480: {
    slidesPerView: 2,
  },
  520: {
    slidesPerView: 3,
  },
  630: {
    slidesPerView: 4,
  },
  900: {
    slidesPerView: 5,
  },
  1000: {
    slidesPerView: 6,
  },
  1200: {
    slidesPerView: 7,
  },
  1550: {
    slidesPerView: 8,
  },
};
