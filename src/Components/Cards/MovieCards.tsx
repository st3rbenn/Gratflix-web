import React, { useState } from 'react';
import { Image } from '@chakra-ui/react';
import { components } from 'src/src/api/typings/api';
import styles from './MovieCard.module.css';
import { NavLink, useLocation } from 'react-router-dom';

interface MovieCardProps {
  movie: components['schemas']['MovieResponse']['data'];
  hover?: boolean;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [hover, setHover] = useState(false);
  const location = useLocation();

  return (
    <>
      <NavLink
        to={`/browse?movie=${movie?.attributes?.title?.split(' ').join('-')}`}
        state={{ background: location, movie }}
        className={styles.boxSettings}>
        <Image
          className={styles.image}
          src={`${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}medium_${
            movie?.attributes?.poster?.data?.attributes?.url?.split('/')[3]
          }`}
          alt={movie?.attributes?.title}
          style={hover ? Blur : unBlur}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          borderRadius='10px'
          w={{ base: '100%', sm: '280px', md: '300px', lg: '320px' }}
          h={{ base: '100%', sm: '200px', md: '210px', lg: '220px' }}
        />
      </NavLink>
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
