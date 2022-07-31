import {Skeleton} from '@chakra-ui/react';
import React from 'react';

export default function Loader() {
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
