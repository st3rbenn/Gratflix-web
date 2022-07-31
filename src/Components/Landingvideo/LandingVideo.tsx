import {AspectRatio, Box, Button, Flex, Grid, Image, Img, Stack, Text} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {BiErrorCircle, BiRightArrow} from 'react-icons/bi';
import {components} from '../../api/typings/api';
import {fetcher} from '../../api/fetcher';
import styles from './LandingVideo.module.css';
import Loader from '../Loader/loader';

interface landingProps {
  loadingData?: () => void;
}

let trailer: string;
export const LandingVideo = ({loadingData}: landingProps) => {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [videoEnd, setVideoEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [landing, setLanding] = useState([] as components['schemas']['LandingResponse']);
  const [video, setVideo] = useState<EventTarget>();

  const result = async () => {
    const getLanding = fetcher.path('/landing').method('get').create();

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
      setLoading(false);
      setLanding(landingResult as components['schemas']['LandingResponse']);
    }
  };

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});
    result();
  }, []);

  useEffect(() => {
    if (scrollPosition > 320) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      video?.pause();
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      video?.play();
    }
  }, [scrollPosition]);

  if (landing?.data?.attributes?.movie?.data?.attributes?.trailer !== undefined) {
    trailer = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
      landing?.data?.attributes?.movie?.data?.attributes?.trailer?.data?.attributes?.url?.split('/')[3]
    }`;
  }

  const logo = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    landing?.data?.attributes?.movie?.data?.attributes?.Logo?.data?.attributes?.url?.split('/')[3]
  }`;
  const poster = `${process.env.REACT_APP_GRATFLIX_UPLOAD_PROVIDER}${
    landing?.data?.attributes?.movie?.data?.attributes?.bigposter?.data?.attributes?.url?.split('/')[3]
  }`;

  const Blur = {
    filter: 'contrast(88%) brightness(72%)',
  };

  return (
    <Box as="section" className={styles.landingContainer}>
      {!loading ? (
        <>
          <Box position="relative">
            <Box className={styles.image} style={{zIndex: 1}}></Box>
            {videoEnd ? (
              <>
                <AspectRatio ratio={1.72} className={styles.blockClick}>
                  <Image
                    src={poster}
                    style={{
                      width: '100% !important',
                      height: '72% !important',
                      filter: 'brightness(0.8) invert(0.12) opacity(1)',
                    }}
                  />
                </AspectRatio>
              </>
            ) : (
              <>
                <AspectRatio ratio={1.72} className={styles.blockClick}>
                  <video
                    poster={poster}
                    src={trailer}
                    muted
                    autoPlay
                    playsInline
                    onTimeUpdate={(ev) => setVideo(ev.target)}
                    style={{
                      filter: 'brightness(0.8) invert(0.12) opacity(1)',
                      width: '100% !important',
                      height: '72% !important',
                    }}
                    onEnded={() => setVideoEnd(true)}
                  />
                </AspectRatio>
              </>
            )}
          </Box>
          <Stack className={styles.stackContainer}>
            <Img w="100%" src={logo} mb={7} />
            <Flex alignItems="center" gap={6}>
              <Link to={'/watch/'}>
                <Button
                  alignSelf="center"
                  variant="solid"
                  bgColor="#181818"
                  color="white"
                  className={styles.BtnStyle}
                  _hover={Blur}
                  p={5}>
                  <Text alignSelf="center" mr="15px" fontWeight="semibold">
                    Regarder
                  </Text>
                  <BiRightArrow height="35px" width="35px" />
                </Button>
              </Link>
              <Link
                to={`?movie=${landing?.data?.attributes?.movie?.data?.attributes?.title?.split(' ').join('-')}`}
                state={{background: location, landing}}>
                <Button
                  alignSelf="center"
                  variant="solid"
                  className={styles.BtnStyle}
                  w="max-content"
                  _hover={Blur}
                  p={5}>
                  <Text alignSelf="center" mr="15" fontWeight="semibold">
                    Plus d&apos;infos
                  </Text>
                  <BiErrorCircle height="35px" width="35px" />
                </Button>
              </Link>
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
