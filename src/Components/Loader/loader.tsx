import {Box, Skeleton} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';

export default function Loader() {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));
  }, []);

  const loaderStyle = {
    height: '220px',
    width: '154px',
    startColor: '#2b2b2b',
    endColor: '#181818',
    borderRadius: '5px',
  };

  return (
    <>
      <Box display="flex" flexDir="row" gap={6}>
        <Skeleton {...loaderStyle} style={{animationDelay: '200ms', animationDuration: '1s'}} />
        <Skeleton {...loaderStyle} style={{animationDelay: '275ms', animationDuration: '1s'}} />
        <Skeleton {...loaderStyle} style={{animationDelay: '350ms', animationDuration: '1s'}} />
        <Skeleton {...loaderStyle} style={{animationDelay: '425ms', animationDuration: '1s'}} />
      </Box>
    </>
  );
}
