import React, { useState } from 'react';
import { Text, Flex, Box, Image } from '@chakra-ui/react';
import { components } from 'src/src/api/typings/api';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: components['schemas']['MovieResponse']['data'];
  hover?: boolean;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <Box className={styles.boxSettings} as='article'>
      <Image
        src={movie?.attributes?.poster?.data?.attributes?.url}
        alt={movie?.attributes?.title}
        w={210}
        style={hover ? Blur : unBlur}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    </Box>
  );
}

const Blur = {
  transform: 'scale(1.1)',
  transition: 'all 0.3s ease-in-out',
  zIndex: '-1',
};

const unBlur = {
  transform: 'scale(1)',
  transition: 'all 0.3s ease-in-out',
  zIndex: '-1',
};
