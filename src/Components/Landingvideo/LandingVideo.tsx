import {AspectRatio, Box, Button, Flex, Grid, Image, Img, Stack, Text} from '@chakra-ui/react';
import React, {useEffect, useRef, useState, VideoHTMLAttributes} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {BiErrorCircle, BiRightArrow} from 'react-icons/bi';
import {components} from '../../api/typings/api';
import {fetcher} from '../../api/fetcher';
import styles from './LandingVideo.module.css';
import Loader from '../loader/loader';

import volumeOff from '../../assets/img/volume-mute-fill.svg';
import volumeOn from '../../assets/img/volume-up-fill.svg';
import reload from '../../assets/img/reload.svg';

let getLanding = fetcher.path('/landing').method('get').create();
export const LandingVideo = () => {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [videoEnd, setVideoEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [landing, setLanding] = useState<components['schemas']['LandingResponse']>();
  const [video, setVideo] = useState<EventTarget>();
  const [volumeMuted, setVolumeMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

    const landingData = JSON.parse(sessionStorage.getItem('landingData') as string);
    landingData.videoEnd = true;
    sessionStorage.setItem('landingData', JSON.stringify(landingData));
  };

  const handleRestartVideo = () => {
    setVideoEnd(false);

    const landingData = JSON.parse(sessionStorage.getItem('landingData') as string);
    landingData.videoEnd = false;
    sessionStorage.setItem('landingData', JSON.stringify(landingData));
  };

  const handleVolumeStatue = () => {
    setVolumeMuted(!volumeMuted);
    const muv = JSON.parse(sessionStorage.getItem('landingData') as string);
    muv.vs = !volumeMuted;
    sessionStorage.setItem('landingData', JSON.stringify(muv));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});
    if (sessionStorage.getItem('landingData') === null) {
      result();
    } else {
      setLanding(JSON.parse(sessionStorage.getItem('landingData') as string).LandingMovieData);
      setVideoEnd(JSON.parse(sessionStorage.getItem('landingData') as string).videoEnd);
      setVolumeMuted(JSON.parse(sessionStorage.getItem('landingData') as string).vs);
      setLoading(false);
    }
    // setTimeout(() => {
    //   result();
    // }, 5000);
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
        poster: `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
          landing?.data?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
        }`,
        LandingMovieData: landing,
        videoEnd: videoEnd,
        vs: volumeMuted,
      };
      sessionStorage.setItem('landingData', JSON.stringify(storedData));
      setLoading(false);
    }
  }, [landing]);

  useEffect(() => {
    if (!videoEnd) {
      if (scrollPosition > 320) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        video?.pause();
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        video?.play();
      }
    }
  }, [scrollPosition, videoEnd]);

  useEffect(() => {
    if (!videoEnd) {
      if (location.state === null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        video?.play();
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        video?.pause();
      }
    }
  }, [location.state]);

  return (
    <Box as="section" className={styles.landingContainer}>
      {!loading ? (
        <>
          <Box position="relative" className={styles.fadeInContainer}>
            <Box className={styles.image} style={{zIndex: 1}}></Box>
            {videoEnd ? (
              <>
                <AspectRatio ratio={2.38} className={`${styles.blockClick} ${styles.currentLanding}`}>
                  <Image src={JSON.parse(sessionStorage.getItem('landingData') as string).poster} />
                </AspectRatio>
              </>
            ) : (
              <>
                <AspectRatio ratio={2.38} className={`${styles.blockClick} ${!videoEnd ? '' : styles.currentLanding}`}>
                  <video
                    poster={JSON.parse(sessionStorage.getItem('landingData') as string).poster}
                    src={JSON.parse(sessionStorage.getItem('landingData') as string).trailer}
                    autoPlay
                    playsInline
                    onTimeUpdate={(ev) => setVideo(ev.target)}
                    onEnded={handleEndVideo}
                    ref={videoRef}
                  />
                </AspectRatio>
              </>
            )}
          </Box>
          <Stack className={`${styles.stackContainer} ${styles.fadeInContainer}`}>
            <Img w="100%" src={JSON.parse(sessionStorage.getItem('landingData') as string).logo} mb={7} />
            <Flex alignItems="center" gap={6} maxW="max-content">
              <Link to={'/watch/'}>
                <Button
                  alignSelf="center"
                  variant="solid"
                  bgColor="#181818"
                  color="white"
                  className={styles.BtnStyle}
                  _hover={Blur}
                  p="25px">
                  <Text alignSelf="center" mr="15px" fontWeight="semibold" fontSize="1.2rem">
                    Regarder
                  </Text>
                  <BiRightArrow height="35px" width="35px" />
                </Button>
              </Link>
              <Link
                to={`?movie=${landing?.data?.attributes?.movie?.data?.attributes?.title?.split(' ').join('-')}`}
                state={{background: location, landing}}>
                <Button alignSelf="center" variant="solid" _hover={Blur} p="25px">
                  <Text alignSelf="center" mr="15" fontWeight="semibold" fontSize="1.2rem">
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
                    style={{padding: 5, border: 'none'}}
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
                    style={{padding: 5, border: 'none'}}
                    _hover={Blur}
                    onClick={handleRestartVideo}
                    className={styles.restartBtn}>
                    <Image src={reload} />
                  </Button>
                </a>
              )}
            </Flex>
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
};

const Blur = {
  filter: 'contrast(88%) brightness(72%)',
};
