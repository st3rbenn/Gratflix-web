import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate, Outlet} from 'react-router-dom';
import {debounce} from 'lodash';
import {AspectRatio, Box, Image, Text} from '@chakra-ui/react';
import {components} from '../../api/typings/api';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: components['schemas']['MovieResponse']['data'];
  isModal?: boolean;
}

export default function MovieCard({movie, isModal}: MovieCardProps) {
  const [hover, setHover] = useState(false);
  const [currentHoverState, setCurrentHoverState] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);
  const location = useLocation();
  const Navigate = useNavigate();
  const isSearchP = location.search.split('=')[0].includes('q');

  const handleMouseEnter = () => {
    setCurrentHoverState(true);
    setTimeout(() => setHover(true), 100);
    // if (!isModal)
    //   if (!location.search.split('=')[0].includes('q'))
    //     if (!cardClicked)
    //       Navigate(`?movie=${movie?.attributes?.title?.split(' ').join('-')}`, {state: {background: location, movie}});
  };

  useEffect(() => {
    if (hover) {
      Navigate(`?preview=${movie?.attributes?.title?.split(' ').join('-')}`, {state: {preview: location, movie}});
    }
  });

  const debounceHandleMouseEnter = useCallback(debounce(handleMouseEnter, 1000), []);
  const bigPoster = movie?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3];
  return (
    <>
      <Image
        src={`${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}medium_${
          movie?.attributes?.poster?.data?.attributes?.url?.split('/')[3]
        }`}
        alt={movie?.attributes?.title}
        onDragOver={() => setHover(!hover)}
        className={currentHoverState ? styles.scaleMovie : styles.unScaleMovie}
        onMouseEnter={debounceHandleMouseEnter}
        onMouseLeave={() => debounceHandleMouseEnter.cancel()}
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
      <Outlet />
    </>
  );
}
