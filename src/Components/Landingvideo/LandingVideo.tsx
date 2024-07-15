import {AspectRatio, Box, Button, ButtonGroup, Grid, Heading, Image, Img, Stack, Text} from '@chakra-ui/react';
import {useEffect, useRef, useState} from 'react';
import {BiErrorCircle, BiRightArrow} from 'react-icons/bi';
import {Link, Outlet, useLocation} from 'react-router-dom';
import styles from './LandingVideo.module.css';

import Loader from 'src/Components/Loader/loader';
import reload from '../../assets/img/reload.svg';
import volumeOff from '../../assets/img/volume-mute-fill.svg';
import volumeOn from '../../assets/img/volume-up-fill.svg';
import {fetcher, imageFetcher} from 'src/plexAPI/api';
import {Metadata, RecentlyAdded} from 'src/plexAPI/type';

// let getLanding = fetcher.path('/landing').method('get').create();
export default function LandingVideo() {
  const [videoEnd, setVideoEnd] = useState(true);
  const [loading, setLoading] = useState(true);
  const [volumeMuted, setVolumeMuted] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [landing, setLanding] = useState<Metadata>();
  const [currentUserAgent, setCurrentUserAgent] = useState('');
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));
  }, []);

  const [bigPoster, setBigPoster] = useState<string>();
  const [trailer, setTrailer] = useState<string>();
  const [logo, setLogo] = useState<string>();

  const location = useLocation();

  const handleGetRecentlyAdded = async () => {
    const {data: result} = await fetcher.path('/library/recentlyAdded').method('get').create()({});
    setLanding((result as RecentlyAdded).MediaContainer.Metadata[0]);
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
      console.log('LANDING IS NULL');
      handleGetRecentlyAdded();
    } else {
      console.log('LANDING IS NOT NULL');
      const movieInfo = JSON.parse(sessionStorage.getItem('landingData') as string);
      setLanding(movieInfo);
      handleGetMovieArt(movieInfo.art);
      setLoading(false);
    }
  }, []);

  const handleGetMovieArt = async (artPath: string) => {
    try {
      const response = await imageFetcher({
        url: artPath,
      });
      if (response) {
        const blob = new Blob([response.data], {type: 'image/jpeg'});
        const url = URL.createObjectURL(blob);
        setBigPoster(url);
      } else {
        console.warn('No data returned from API');
      }
    } catch (error) {
      console.error('Error fetching movie art:', error);
    }
  };

  useEffect(() => {
    // console.log(landing?.data?.attributes?.movie?.data?.attributes);
    if (sessionStorage.getItem('landingData') === null && landing) {
      sessionStorage.setItem('landingData', JSON.stringify(landing));
      handleGetMovieArt(landing?.art);
      // setTrailer(storedData.trailer);
      // setLogo(storedData.logo);
      setLanding(landing);
      setLoading(false);
    }
  }, [landing]);

  // useEffect(() => {
  //   if (!videoEnd) {
  //     if (scrollPosition > 500) {
  //       video?.current?.pause();
  //     } else {
  //       video?.current?.play();
  //     }
  //   }
  // }, [scrollPosition, videoEnd]);

  // useEffect(() => {
  //   video?.current?.play();
  // }, [video]);

  useEffect(() => {
    if (!videoEnd) {
      if (location.state === null) {
        video?.current?.play();
      } else {
        video?.current?.pause();
      }
    }
  }, [location.state]);

  return (
    <Box as="section" className={styles.landingContainer}>
      {!loading ? (
        <>
          <Box position="relative">
            <Box className={`${styles.image}`} style={{zIndex: 1}}></Box>
            {videoEnd ? (
              <>
                <AspectRatio ratio={2} className={`${styles.blockClick} ${styles.currentLanding}`}>
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
            flexGrow={0}
            className={`${styles.stackContainer} ${styles.fadeInContainer}`}
            top={currentWidth > 768 ? '55%' : '60%'}>
            {/* <Img src={logo} mb={3} /> */}
            <Heading alignSelf="flex-start" mr="15" fontWeight="semibold" color="whitesmoke">
              {landing?.title}
            </Heading>
            <ButtonGroup alignItems="center" spacing={6}>
              <Link to={`/watch/${landing?.guid}`} state={{MoviePath: location, landing}}>
                <Button alignSelf="center" variant="solid" _hover={Blur} p="25px" bgColor="#181818" color="white">
                  <Text alignSelf="center" mr="15" fontWeight="semibold">
                    Regarder
                  </Text>
                  <BiRightArrow height="35px" width="35px" />
                </Button>
              </Link>
              <Link to={`?movie=${landing?.title}`} state={{background: location, landing}}>
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
              {/* {!videoEnd && (
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
              )} */}
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
