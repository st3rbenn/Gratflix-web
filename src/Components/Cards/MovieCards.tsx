import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {debounce} from 'lodash';
import {Image} from '@chakra-ui/react';
import {components} from '../../api/typings/api';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: components['schemas']['MovieResponse']['data'];
  isModal?: boolean;
}

export default function MovieCard({movie, isModal}: MovieCardProps) {
  const [hover, setHover] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);
  const location = useLocation();
  const Navigate = useNavigate();
  const isSearchP = location.search.split('=')[0].includes('q');

  const handleMouseEnter = () => {
    if (!isModal)
      if (!location.search.split('=')[0].includes('q'))
        if (!cardClicked)
          Navigate(`?movie=${movie?.attributes?.title?.split(' ').join('-')}`, {state: {background: location, movie}});
  };

  const debounceHandleMouseEnter = useCallback(debounce(handleMouseEnter, 1500), []);

  return (
    <>
      <Link
        to={`?movie=${movie?.attributes?.title?.split(' ').join('-')}`}
        state={{background: location, movie}}
        className={styles.boxSettings}
        onMouseEnter={debounceHandleMouseEnter}
        onMouseLeave={() => debounceHandleMouseEnter.cancel()}>
        <Image
          className={styles.image}
          src={`${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}medium_${
            movie?.attributes?.poster?.data?.attributes?.url?.split('/')[3]
          }`}
          alt={movie?.attributes?.title}
          style={hover ? Blur : unBlur}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onDrag={() => console.log('testions')}
          borderRadius="5px"
          w={{base: '100%', sm: '240px', md: '260px', lg: '263px'}}
          h={{
            base: '100%',
            sm: '200px',
            md: '220px',
            lg: isModal ? '220px' : isSearchP ? '300px' : '240px',
            '2xl': isModal ? '220px' : '320px',
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
