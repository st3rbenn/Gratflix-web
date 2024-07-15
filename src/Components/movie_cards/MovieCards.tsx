import {Image} from '@chakra-ui/react';
import {debounce} from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {fetcher, imageFetcher} from 'src/plexAPI/api';
import {Metadata} from 'src/plexAPI/type';

interface MovieCardProps {
  movie: Metadata;
  isModal?: boolean;
}

export default function MovieCard({movie, isModal}: MovieCardProps) {
  const [hover, setHover] = useState(false);
  const [currentHoverState, setCurrentHoverState] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);
  const [movieArt, setMovieArt] = useState<string>();
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

  const handleGetMovieArt = async (artPath: string) => {
    try {
      const response = await imageFetcher({
        url: artPath,
      });
      if (response) {
        const blob = new Blob([response.data], {type: 'image/jpeg'});
        const url = URL.createObjectURL(blob);
        setMovieArt(url);
      } else {
        console.warn('No data returned from API');
      }
    } catch (error) {
      console.error('Error fetching movie art:', error);
    }
  };

  useEffect(() => {
    if (movie?.art !== undefined) {
      handleGetMovieArt(movie?.thumb);
    }
  }, [movie?.art]);

  const debounceHandleMouseEnter = useCallback(debounce(handleMouseEnter, 1000), []);
  return (
    <>
      {isPreview && <Outlet />}
      <Image
        src={movieArt}
        alt={movie?.title}
        onDragOver={() => setHover(!hover)}
        // className={currentHoverState ? styles.scaleMovie : styles.unScaleMovie}
        onMouseEnter={debounceHandleMouseEnter}
        onMouseLeave={handleMouselLeave}
        borderRadius="5px"
        w={{base: '100%'}}
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
