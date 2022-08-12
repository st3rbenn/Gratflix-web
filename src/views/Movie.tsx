import {Box} from '@chakra-ui/react';
import React from 'react';
import {useLocation} from 'react-router-dom';
import {components} from 'src/api/typings/api';
import styles from './GlobalStyle.module.css';

interface locationState {
  landing?: components['schemas']['LandingResponse'];
  background: {
    pathname: string;
    search: string;
  };
}

function Movie() {
  const location = useLocation();
  const {landing} = (location.state as locationState) || {};
  console.log(landing?.data?.attributes?.movie?.data?.attributes?.URL);
  return (
    <iframe
      src={landing?.data?.attributes?.movie?.data?.attributes?.URL}
      allowFullScreen
      width="100%"
      height="100%"
      className={styles.watchMovie}
    />
  );
}

export default Movie;
