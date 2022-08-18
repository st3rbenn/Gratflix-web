import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {components} from 'src/api/typings/api';
import Loader from 'src/Components/Loader/loader';
import styles from './GlobalStyle.module.css';

interface moviePath {
  landing?: components['schemas']['LandingResponse'];
  currentMovie?: components['schemas']['MovieResponse']['data'];
  background: {
    pathname: string;
    search: string;
  };
}

function Movie() {
  const [isMovieLoaded, setIsMovieLoaded] = useState(false);
  const [movieLanding, setMovieLanding] = useState<components['schemas']['LandingResponse']>();
  const [movieModal, setMovieModal] = useState<components['schemas']['MovieResponse']['data']>();
  const location = useLocation();
  const {landing} = (location.state as moviePath) || {};
  const {currentMovie} = (location.state as moviePath) || {};

  useEffect(() => {
    if (landing) {
      setMovieLanding(landing);
      setIsMovieLoaded(true);
    } else {
      if (currentMovie) {
        setMovieModal(currentMovie);
        setIsMovieLoaded(true);
      }
    }
  }, [landing, currentMovie]);

  return (
    <>
      {isMovieLoaded ? (
        <iframe
          src={
            (movieLanding && movieLanding?.data?.attributes?.movie?.data?.attributes?.URL) ||
            (movieModal && movieModal?.attributes?.URL)
          }
          allowFullScreen
          width="100%"
          height="100%"
          className={styles.watchMovie}
        />
      ) : (
        <Loader />
      )}
    </>
  );
}
export default Movie;
