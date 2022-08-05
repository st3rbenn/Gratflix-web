import {AspectRatio, Box, Button, Flex, Grid, Image, Img, Stack, Text} from '@chakra-ui/react';
import React, {useEffect, useRef, useState} from 'react';
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
  const [volumeMuted, setVolumeMuted] = useState(false);

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
    if (landingResult !== undefined) {
      setLanding(landingResult as components['schemas']['LandingResponse']);
    }
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
    setVolumeMuted(false);

    const landingData = JSON.parse(sessionStorage.getItem('landingData') as string);
    landingData.videoEnd = false;
    sessionStorage.setItem('landingData', JSON.stringify(landingData));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});
    if (sessionStorage.getItem('landingData') === null) {
      result();
    } else {
      setLanding(JSON.parse(sessionStorage.getItem('landingData') as string).LandingMovieData);
      setVideoEnd(JSON.parse(sessionStorage.getItem('landingData') as string).videoEnd);
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
        poster: `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
          landing?.data?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
        }`,
        LandingMovieData: landing,
        videoEnd: false,
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
                  <Image
                    src={JSON.parse(sessionStorage.getItem('landingData') as string).poster}
                    height="119% !important"
                  />
                </AspectRatio>
              </>
            ) : (
              <>
                <AspectRatio
                  ratio={2.38}
                  className={`${styles.blockClick} ${
                    !JSON.parse(sessionStorage.getItem('landingData') as string).videoEnd ? '' : styles.currentLanding
                  }`}>
                  <video
                    poster={JSON.parse(sessionStorage.getItem('landingData') as string).poster}
                    src={JSON.parse(sessionStorage.getItem('landingData') as string).trailer}
                    muted={!volumeMuted}
                    autoPlay
                    playsInline
                    onTimeUpdate={(ev) => setVideo(ev.target)}
                    onEnded={handleEndVideo}
                  />
                </AspectRatio>
              </>
            )}
          </Box>
          <Stack className={`${styles.stackContainer} ${styles.fadeInContainer}`}>
            <Img w="100%" src={JSON.parse(sessionStorage.getItem('landingData') as string).logo} mb={7} />
            <Flex alignItems="center" gap={6}>
              <Link to={'/watch/'}>
                <Button
                  alignSelf="center"
                  variant="solid"
                  bgColor="#181818"
                  color="white"
                  className={styles.BtnStyle}
                  _hover={Blur}>
                  <Text alignSelf="center" mr="15px" fontWeight="semibold">
                    Regarder
                  </Text>
                  <BiRightArrow height="35px" width="35px" />
                </Button>
              </Link>
              <Link
                to={`?movie=${landing?.data?.attributes?.movie?.data?.attributes?.title?.split(' ').join('-')}`}
                state={{background: location, landing}}>
                <Button alignSelf="center" variant="solid" w="max-content" _hover={Blur}>
                  <Text alignSelf="center" mr="15" fontWeight="semibold" size="md">
                    Plus d&apos;infos
                  </Text>
                  <BiErrorCircle height="35px" width="35px" />
                </Button>
              </Link>
              {!videoEnd ? (
                <Button
                  alignSelf="center"
                  variant="solid"
                  w="max-content"
                  _hover={Blur}
                  style={{padding: '15px'}}
                  onClick={() => setVolumeMuted(!volumeMuted)}>
                  <Image src={volumeMuted ? volumeOn : volumeOff} width="24px" height="24px" />
                </Button>
              ) : (
                <Button
                  alignSelf="center"
                  variant="solid"
                  w="max-content"
                  _hover={Blur}
                  style={{padding: '15px'}}
                  onClick={handleRestartVideo}>
                  <Image src={reload} width="24px" height="24px" />
                </Button>
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
      ;
    </Box>
  );
};

const Blur = {
  filter: 'contrast(88%) brightness(72%)',
};
