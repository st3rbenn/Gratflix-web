import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Heading, Flex } from '@chakra-ui/react';
import { fetcher } from 'src/src/api/fetcher';
import { components } from 'src/src/api/typings/api';

export const Carousel = () => {
  const [movies, setMovies] = useState([] as components['schemas']['MovieListResponse']);
  const swiper = useRef(null);

  const getMovies = async () => {
    const getMovie = fetcher.path('/movies').method('get').create();

    const queryMovie = {
      populate: 'category',
    };

    const { data: moviesArray } = await getMovie(queryMovie);
    setMovies(moviesArray);
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);
};
