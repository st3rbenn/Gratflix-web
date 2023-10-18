import {ChakraProvider, Skeleton} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    return null;
  }
  return (
    <>
      <Skeleton
        height="220px"
        width="154px"
        startColor="#2b2b2b"
        endColor="#181818"
        borderRadius="5px"
        style={{
          animationDelay: '200ms',
          animationDuration: '1s',
        }}
      />
      <Skeleton
        height="220px"
        width="154px"
        startColor="#2b2b2b"
        endColor="#181818"
        borderRadius="5px"
        style={{
          animationDelay: '300ms',
          animationDuration: '1s',
        }}
      />
      <Skeleton
        height="220px"
        width="154px"
        startColor="#2b2b2b"
        endColor="#181818"
        borderRadius="5px"
        style={{
          animationDelay: '400ms',
          animationDuration: '1s',
        }}
      />
      <Skeleton
        height="220px"
        width="154px"
        startColor="#2b2b2b"
        endColor="#181818"
        borderRadius="5px"
        style={{
          animationDelay: '500ms',
          animationDuration: '1s',
        }}
      />
    </>
  );
}
