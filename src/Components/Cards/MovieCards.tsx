import React, { useState } from 'react';
import { Text, Flex, Box, Image, useDisclosure } from '@chakra-ui/react';
import { components } from 'src/src/api/typings/api';
import styles from './MovieCard.module.css';
import { SwiperSlideProps } from 'swiper/react';

interface MovieCardProps {
  movie: components['schemas']['MovieResponse']['data'];
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Box {...(boxSettings as SwiperSlideProps)}>
      <Image
        src={`https://api-gratflix.onrender.com${movie?.attributes?.poster?.data?.attributes?.url}`}
        alt={movie?.attributes?.title}
        w={210}
      />
    </Box>
  );
}

const boxSettings = {
  borderRadius: 'lg',
  position: 'relative',
  cursor: 'pointer',
  width: 'max-content',
  borderStyle: 'none',
  as: 'article',
  ml: 2,
  mr: 2,
  mt: 5,
};
