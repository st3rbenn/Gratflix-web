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
  category: number | string;
}

export function Carousel({ category }: CarouselProps) {
  const [movies, setMovies] = useState([] as components['schemas']['MovieListResponse']);
  const [hover, setHover] = useState(false);
  const [listTitle, setListTitle] = useState<string>('...loading');

  const getMovies = async () => {
    const getMovie = fetcher.path('/movies').method('get').create();
    let queryMovie: object = {};
    if (typeof category === 'string') {
      if (category === 'recent') {
        queryMovie = {
          populate: 'poster',
          sort: 'publishedAt:desc',
          'populate[0]': 'bigposter',
          'pagination[pageSize]': 12,
        };
      }
    } else {
      queryMovie = {
        populate: 'category',
        'populate[0]': 'poster',
        'populate[1]': 'bigposter',
        'filters[category]': category,
        'pagination[pageSize]': 12,
      };
    }

    const { data: moviesArray } = await getMovie(queryMovie);
    setMovies(moviesArray);
  };
  getMovies();

  useEffect(() => {
    if (typeof category === 'string') {
      if (category === 'recent') {
        setListTitle('Récemment ajoutés');
      } else if (category === 'trending') {
        setListTitle('Les plus populaires');
      } else if (category === 'for you') {
        setListTitle('Pour vous');
      }
    } else {
      const title = movies?.data?.[0]?.attributes?.category?.data?.attributes?.categorie as string;
      setListTitle(title);
    }
  }, [movies]);
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
        {movies?.data?.map((movie: components['schemas']['MovieResponse']['data']) => {
          const w = movie?.attributes?.poster?.data?.attributes?.width;
          return (
            <SwiperSlide key={movie?.id} style={{ width: 196.571 + 'px' }}>
              <Flex justifyContent='center' alignItems='center'>
                <MovieCard movie={movie} />
              </Flex>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

// const settingsArrow = {
//   variant: 'ghost',
//   colorscheme: 'whiteAlpha',
//   position: 'absolute',
//   top: '40%',
//   zIndex: '1',
//   transition: 'all 150ms ease-in-out',
//   cursor: 'pointer',
// };
