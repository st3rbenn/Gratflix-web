import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Heading, Flex } from '@chakra-ui/react';
import { fetcher } from '../../api/fetcher';
import { components } from '../../api/typings/api';
import MovieCard from '../Cards/MovieCards';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface CarouselProps {
  category: number;
  listTitle: string;
}

export function Carousel({ category, listTitle }: CarouselProps) {
  const [movies, setMovies] = useState([] as components['schemas']['MovieListResponse']);

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
      <Heading size='md' mt={7} ml={3} color='white'>
        {listTitle}
      </Heading>
      <Swiper pagination={{ clickable: true }} slidesPerView='auto' preloadImages={true} lazy={true}>
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

const settingsArrow = {
  variant: 'ghost',
  colorscheme: 'whiteAlpha',
  position: 'absolute',
  top: '40%',
  zIndex: '1',
  transition: 'all 150ms ease-in-out',
  cursor: 'pointer',
};
