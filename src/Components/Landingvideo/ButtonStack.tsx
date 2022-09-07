import {Stack, Img, ButtonGroup, Button, Text, Image} from '@chakra-ui/react';
import react, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {BiRightArrow, BiErrorCircle} from 'react-icons/bi';
import {components} from 'src/api/typings/api';
import styles from './LandingVideo.module.css';

import volumeOff from '../../assets/img/volume-mute-fill.svg';
import volumeOn from '../../assets/img/volume-up-fill.svg';
import reload from '../../assets/img/reload.svg';

interface StackProps {
  landingData?: components['schemas']['LandingResponse'];
  onRestartVideo: () => void;
  soundStatus: () => void;
  onVideoEnd: boolean;
  videoSound: boolean;
  logo?: string;
}

export default function ButtonStack(props: StackProps) {
  const {landingData, onRestartVideo, soundStatus, onVideoEnd, videoSound, logo} = props;
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));
  }, []);

  return (
    <Stack className={`${styles.stackContainer} ${styles.fadeInContainer}`} top={currentWidth > 768 ? '45%' : '60%'}>
      <Img src={logo} mb={3} />
      <ButtonGroup alignItems="center" spacing={6}>
        <Link
          to={`/watch/${landingData?.data?.attributes?.movie?.data?.id}`}
          state={{MoviePath: location, landingData}}>
          <Button
            alignSelf="center"
            variant="solid"
            _hover={Blur}
            style={{
              backgroundColor: '#181818',
              color: '#fff',
            }}>
            <Text alignSelf="center" mr="15" fontWeight="semibold">
              Regarder
            </Text>
            <BiRightArrow height="35px" width="35px" />
          </Button>
        </Link>
        <Link
          to={`?movie=${landingData?.data?.attributes?.movie?.data?.attributes?.title?.split(' ').join('-')}`}
          state={{background: location, landingData}}>
          <Button alignSelf="center" variant="solid" _hover={Blur}>
            <Text alignSelf="center" mr="15" fontWeight="semibold">
              Plus d&apos;infos
            </Text>
            <BiErrorCircle height="35px" width="35px" />
          </Button>
        </Link>
        {currentWidth > 768 && (
          <>
            {!onVideoEnd && (
              <a className={styles.restartBtn}>
                <Button
                  alignSelf="center"
                  variant="ghost"
                  w="max-content"
                  _hover={Blur}
                  style={{padding: 0, border: 'none'}}
                  onClick={soundStatus}>
                  <Image src={videoSound ? volumeOn : volumeOff} />
                </Button>
              </a>
            )}
            {onVideoEnd && (
              <a className={styles.restartBtn}>
                <Button
                  alignSelf="center"
                  variant="ghost"
                  w="max-content"
                  style={{padding: 0, border: 'none'}}
                  _hover={Blur}
                  onClick={onRestartVideo}
                  className={styles.restartBtn}>
                  <Image src={reload} />
                </Button>
              </a>
            )}
          </>
        )}
      </ButtonGroup>
    </Stack>
  );
}

const Blur = {
  filter: 'contrast(88%) brightness(72%)',
};
