import React, {useState} from 'react';
import {Image} from '@chakra-ui/react';
import {components} from '../../api/typings/api';
import {Link, useLocation} from 'react-router-dom';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: components['schemas']['MovieResponse']['data'];
  hover?: boolean;
  isModal?: boolean;
}

export default function MovieCard({movie, isModal}: MovieCardProps) {
  const [hover, setHover] = useState(false);
  const location = useLocation();

  return (
    <>
      <Link
        to={`?movie=${movie?.attributes?.title?.split(' ').join('-')}`}
        state={{background: location, movie}}
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
          borderRadius="5px"
          w={{base: '100%', sm: '280px', md: '300px', lg: '320px'}}
          h={{
            base: '100%',
            sm: '200px',
            md: '220px',
            lg: isModal ? '220px' : '244px',
            '2xl': isModal ? '220px' : '270px',
          }}
        />
      </Link>
    </>
  );
}

const Blur = {
  transform: 'scale(1.05)',
  transition: 'all 0.3s ease-in-out',
  zIndex: '-1',
};

const unBlur = {
  transform: 'scale(1)',
  transition: 'all 0.3s ease-in-out',
  zIndex: '-1',
};
