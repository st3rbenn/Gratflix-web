import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Heading, Flex } from '@chakra-ui/react';
import { fetcher } from '../../api/fetcher';
import { components } from '../../api/typings/api';
import MovieCard from '../Cards/MovieCards';

interface CarouselProps {
  category: number;
  listTitle: string;
}

export function Carousel({ category, listTitle }: CarouselProps) {
  const [movies, setMovies] = useState([] as components['schemas']['MovieListResponse']);
  const swiper = useRef();

  const getMovies = async () => {
    const getMovie = fetcher.path('/movies').method('get').create();

    const queryMovie = {
      populate: 'category',
      'populate[0]': 'poster',
      'filters[category]': category,
    };

    const { data: moviesArray } = await getMovie(queryMovie);
    setMovies(moviesArray);
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      <Heading size='md' mt={7} ml={3}>
        {listTitle}
      </Heading>
      <Swiper
        breakpoints={breakpoint}
        pagination={{ clickable: true }}
        slidesPerView='auto'
        preloadImages={true}
        lazy={true}>
        {/* <Flex {...settingsArrow} left={5} onClick={() => swiper.current.swiper.slidePrev()} _hover={{ bgColor: 'blackAlpha.400' }}>
            <MdArrowBackIos size={50}/>
        </Flex>
        <Flex {...settingsArrow} right={5} onClick={() => swiper.current.swiper.slideNext()} _hover={{ bgColor: 'blackAlpha.400' }}>
            <MdArrowForwardIos size={50}/>
        </Flex> */}
        {movies?.data?.map((movie: components['schemas']['MovieResponse']['data']) => (
          <SwiperSlide key={movie?.id} style={{ width: 196.571 + 'px' }}>
            <Flex justifyContent='center' alignItems='center'>
              <MovieCard movie={movie} />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

const breakpoint = {
  375: {
    slidesPerView: 1,
  },
  400: {
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
  1200: {
    slidesPerView: 6,
  },
  1350: {
    slidesPerView: 8,
  },
};

const settingsArrow = {
  variant: 'ghost',
  colorscheme: 'whiteAlpha',
  position: 'absolute',
  top: '40%',
  zIndex: '1',
  transition: 'all 150ms ease-in-out',
  cursor: 'pointer',
};
