import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Heading, Flex } from '@chakra-ui/react';
import { fetcher } from '../../api/fetcher';
import { components } from '../../api/typings/api';

interface CarouselProps {
  category: number;
  listTitle: string;
}

export function Carousel({ category, listTitle }: CarouselProps) {
  const [movies, setMovies] = useState([] as components['schemas']['MovieListResponse']);
  const swiper = useRef() as MutableRefObject<HTMLDivElement>;

  const getMovies = async () => {
    const getMovie = fetcher.path('/movies').method('get').create();

    const queryMovie = {
      populate: 'category',
      'filters[category]': category,
    };

    const { data: moviesArray } = await getMovie(queryMovie);
    setMovies(moviesArray);
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);
  return (
    <>
      <Heading size='md' mt={7} ml={3}>
        {listTitle}
      </Heading>
      <Swiper {...swiperSettings} >
        {/* <Flex {...settingsArrow} left={5} onClick={() => swiper.current.swiper.slidePrev()} _hover={{ bgColor: 'blackAlpha.400' }}>
            <MdArrowBackIos size={50}/>
        </Flex>
        <Flex {...settingsArrow} right={5} onClick={() => swiper.current.swiper.slideNext()} _hover={{ bgColor: 'blackAlpha.400' }}>
            <MdArrowForwardIos size={50}/>
        </Flex>
        {
            movies.map(movie =>
                <SwiperSlide key={props.list + movie.id} style={{width: 196.571 + 'px'}}>
                    <Flex justifyContent='center' alignItems='center'>
                        <Loader sized={210} isLoaded={Loading}/>
                            <MovieCards {...movie} sized={210}/>
                    </Flex>
                </SwiperSlide>
            )
        } */}
      </Swiper>
    </>
  );
}

const swiperSettings = {
  pagination: { clickable: true },
  slidesPerView: 'auto',
  preloadImages: false,
  lazy: true,
  breakpoints: {
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
