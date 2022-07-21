import React, { useEffect, useState } from 'react';
import { Box, Image, useDisclosure } from '@chakra-ui/react';
import { components } from 'src/src/api/typings/api';
import { MovieModal } from '../Modals/MovieModal';
import styles from './MovieCard.module.css';
import { debounce } from 'lodash';

interface MovieCardProps {
  movie: components['schemas']['MovieResponse']['data'];
  hover?: boolean;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [hover, setHover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // let i = 0;

  // const handleOver = debounce((ev) => {
  //   console.log(ev.isisDefaultPrevented);
  //   return onOpen();
  // }, 1500);

  // useEffect(() => {
  //   while (hover) {
  //     i++;
  //   }

  //   if (i == 3) {
  //     onOpen();
  //   }
  // }, []);

  // console.log(i);

  return (
    <>
      <Box className={styles.boxSettings} as='article'>
        <Image
          src={`${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
            movie?.attributes?.poster?.data?.attributes?.url?.split('/')[3]
          }`}
          alt={movie?.attributes?.title}
          w={movie?.attributes?.poster?.data?.attributes?.width}
          style={hover ? Blur : unBlur}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </Box>
      <MovieModal data={movie} isOpen={isOpen} onClose={onClose} />
    </>
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
