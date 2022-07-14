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
    <Box className={styles.boxSettings} as='article'>
      <Image
        src={`https://api-gratflix.onrender.com${movie?.attributes?.poster?.data?.attributes?.url}`}
        alt={movie?.attributes?.title}
        w={210}
      />
    </Box>
  );
}
