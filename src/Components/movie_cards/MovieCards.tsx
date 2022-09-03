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
  const isSearchP = location.search.split('=')[0].includes('q');
  const isPreview = location.search.split('=')[0].includes('preview');

  const handleMouseEnter = () => {
    setCurrentHoverState(true);
    setTimeout(() => setHover(true), 100);
    // if (!isModal)
    //   if (!location.search.split('=')[0].includes('q'))
    //     if (!cardClicked)
    //       Navigate(`?movie=${movie?.attributes?.title?.split(' ').join('-')}`, {state: {background: location, movie}});
  };

  const handleMouselLeave = () => {
    if (!hover) {
      debounceHandleMouseEnter.cancel();
    } else {
      setHover(false);
      setCurrentHoverState(false);
    }
  };

  // useEffect(() => {
  //   if (hover) {
  //     Navigate(`?preview=${movie?.attributes?.title?.split(' ').join('-')}`, {state: {preview: movie}});
  //   }
  // }, [hover]);

  const debounceHandleMouseEnter = useCallback(debounce(handleMouseEnter, 1000), []);
  return (
    <>
      {isPreview && <Outlet />}
      <Image
        src={`${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
          movie?.attributes?.poster?.data?.attributes?.url?.split('/')[3]
        }`}
        alt={movie?.attributes?.title}
        onDragOver={() => setHover(!hover)}
        // className={currentHoverState ? styles.scaleMovie : styles.unScaleMovie}
        onMouseEnter={debounceHandleMouseEnter}
        onMouseLeave={handleMouselLeave}
        borderRadius="5px"
        w={{base: '100%', sm: '240px', md: '260px', lg: '275px'}}
        h={{
          base: isModal ? '100%' : '150px',
          sm: '200px',
          md: '220px',
          lg: isModal ? '220px' : isSearchP ? '300px' : '280px',
        }}
      />
    </>
  );
}

const widthBreakpoint = {
  200: {
    width: '200px',
  },
  480: {
    slidesPerView: 2,
  },
  520: {
    slidesPerView: 3,
  },
  630: {
    slidesPerView: 4,
  },
  676: {
    slidesPerView: 5,
  },
  900: {
    slidesPerView: 6,
  },
  1000: {
    slidesPerView: 7,
  },
  1200: {
    slidesPerView: 8,
  },
};
