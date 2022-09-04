import {AspectRatio, Box, Button, ButtonGroup, Grid, Image, Img, Stack, Text} from '@chakra-ui/react';
import React, {useEffect, useRef, useState} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {BiErrorCircle, BiRightArrow} from 'react-icons/bi';
import {components} from '../../api/typings/api';
import {fetcher} from '../../api/fetcher';
import styles from './LandingVideo.module.css';
import Loader from '../loader/Loader';

import volumeOff from '../../assets/img/volume-mute-fill.svg';
import volumeOn from '../../assets/img/volume-up-fill.svg';
import reload from '../../assets/img/reload.svg';

let getLanding = fetcher.path('/landing').method('get').create();
export default function LandingVideo() {
  const [videoEnd, setVideoEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [volumeMuted, setVolumeMuted] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [landing, setLanding] = useState<components['schemas']['LandingResponse']>();
  const [currentUserAgent, setCurrentUserAgent] = useState('');
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));
  }, []);

  const [bigPoster, setBigPoster] = useState<string>();
  const [trailer, setTrailer] = useState<string>();
  const [logo, setLogo] = useState<string>();

  const location = useLocation();

  const result = async () => {
    getLanding = fetcher.path('/landing').method('get').create();
    const queryLanding = {
      populate: 'movie',
      'populate[1]': 'movie.Logo',
      'populate[2]': 'movie.bigposter',
      'populate[3]': 'movie.poster',
      'populate[4]': 'movie.trailer',
      'populate[5]': 'movie.actors',
      'populate[6]': 'movie.categories',
      'populate[7]': 'movie.realisators',
      'populate[8]': 'movie.age',
    };
    const {data: landingResult} = await getLanding(queryLanding);
    setLanding(landingResult as components['schemas']['LandingResponse']);
  };

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  const handleEndVideo = () => {
    setVideoEnd(true);
    setVolumeMuted(true);

    const landingData = JSON.parse(sessionStorage.getItem('landingData') as string);
    landingData.videoEnd = true;
    sessionStorage.setItem('landingData', JSON.stringify(landingData));
  };

  const handleRestartVideo = () => {
    setVideoEnd(false);
  };

  const handleVolumeStatue = () => {
    setVolumeMuted(!volumeMuted);
  };

  useEffect(() => {
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    setCurrentUserAgent(navigator.userAgent);
    window.addEventListener('scroll', handleScroll, {passive: true});
    if (sessionStorage.getItem('landingData') === null) {
      result();
    } else {
      setLanding(JSON.parse(sessionStorage.getItem('landingData') as string).LandingMovieData);
      setVideoEnd(JSON.parse(sessionStorage.getItem('landingData') as string).videoEnd);
      setBigPoster(JSON.parse(sessionStorage.getItem('landingData') as string).bigPoster);
      setTrailer(JSON.parse(sessionStorage.getItem('landingData') as string).trailer);
      setLogo(JSON.parse(sessionStorage.getItem('landingData') as string).logo);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('landingData') === null && landing) {
      const storedData = {
        trailer: `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
          landing?.data?.attributes?.movie?.data?.attributes?.trailer?.data?.attributes?.url?.split('/')[3]
        }`,
        logo: `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
          landing?.data?.attributes?.movie?.data?.attributes?.Logo?.data?.attributes?.url?.split('/')[3]
        }`,
        bigPoster: `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
          landing?.data?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
        }`,
        LandingMovieData: landing,
        videoEnd: videoEnd,
      };
      sessionStorage.setItem('landingData', JSON.stringify(storedData));

      setBigPoster(storedData.bigPoster);
      setTrailer(storedData.trailer);
      setLogo(storedData.logo);
      setLanding(storedData.LandingMovieData);
      setVideoEnd(storedData.videoEnd);
      setLoading(false);
    }
  }, [landing]);

  useEffect(() => {
    if (!videoEnd) {
      if (scrollPosition > 500) {
        video?.current?.pause();
      } else {
        video?.current?.play();
      }
    }
  }, [scrollPosition, videoEnd]);

  useEffect(() => {
    video?.current?.play();
  }, [video]);

  useEffect(() => {
    if (!videoEnd) {
      if (location.state === null) {
        video?.current?.play();
      } else {
        video?.current?.pause();
      }
    }
  }, [location.state]);

  console.log(currentUserAgent);

  return (
    <Box as="section" className={styles.landingContainer}>
      {!loading ? (
        <>
          <Box position="relative">
            <Box className={`${styles.image}`} style={{zIndex: 1}}></Box>
            {videoEnd ? (
              <>
                <AspectRatio ratio={2.38} className={`${styles.blockClick} ${styles.currentLanding}`}>
                  <Image src={bigPoster} />
                </AspectRatio>
              </>
            ) : (
              <AspectRatio ratio={2.38} className={`${styles.blockClick} ${!videoEnd ? '' : styles.currentLanding}`}>
                <video poster={bigPoster} autoPlay muted={volumeMuted} playsInline ref={video} onEnded={handleEndVideo}>
                  <source src={trailer} type="video/mp4" />
                </video>
              </AspectRatio>
            )}
          </Box>
          <Stack
            className={`${styles.stackContainer} ${styles.fadeInContainer}`}
            top={currentWidth > 768 ? '45%' : '60%'}>
            <Img src={logo} mb={3} />
            <ButtonGroup alignItems="center" spacing={6}>
              <Link to={`/watch/${landing?.data?.attributes?.movie?.data?.id}`} state={{MoviePath: location, landing}}>
                <Button
                  alignSelf="center"
                  variant="solid"
                  _hover={Blur}
                  style={{
                    backgroundColor: '#181818',
                    color: '#fff',
                  }}>
                  <Text
                    alignSelf="center"
                    mr="15"
                    fontWeight="semibold"
                    fontSize={{
                      base: '.875rem',
                      sm: '1rem',
                      xl: '1.2rem',
                    }}>
                    Regarder
                  </Text>
                  <BiRightArrow height="35px" width="35px" />
                </Button>
              </Link>
              <Link
                to={`?movie=${landing?.data?.attributes?.movie?.data?.attributes?.title?.split(' ').join('-')}`}
                state={{background: location, landing}}>
                <Button alignSelf="center" variant="solid" _hover={Blur}>
                  <Text
                    alignSelf="center"
                    mr="15"
                    fontWeight="semibold"
                    fontSize={{
                      base: '.875rem',
                      sm: '1rem',
                      xl: '1.2rem',
                    }}>
                    Plus d&apos;infos
                  </Text>
                  <BiErrorCircle height="35px" width="35px" />
                </Button>
              </Link>
              {!videoEnd && (
                <a className={styles.restartBtn}>
                  <Button
                    alignSelf="center"
                    variant="ghost"
                    w="max-content"
                    _hover={Blur}
                    style={{padding: 0, border: 'none'}}
                    onClick={handleVolumeStatue}>
                    <Image src={volumeMuted ? volumeOn : volumeOff} />
                  </Button>
                </a>
              )}
              {videoEnd && (
                <a className={styles.restartBtn}>
                  <Button
                    alignSelf="center"
                    variant="ghost"
                    w="max-content"
                    style={{padding: 0, border: 'none'}}
                    _hover={Blur}
                    onClick={handleRestartVideo}
                    className={styles.restartBtn}>
                    <Image src={reload} />
                  </Button>
                </a>
              )}
            </ButtonGroup>
          </Stack>
          <Outlet />
        </>
      ) : (
        <Grid
          gridTemplateColumns="repeat(4, 1fr)"
          width="fit-content"
          gap="2rem"
          position="absolute"
          top="136px"
          left="70px">
          <Loader />
        </Grid>
      )}
    </Box>
  );
}

const Blur = {
  filter: 'contrast(88%) brightness(72%)',
};
