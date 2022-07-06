import { Container } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const resultSearch = location.search.split('=')[1];

  return (
    <Container maxW='container.xxl' as='section' bgColor='rgb(20, 20, 20);' color='white' minH='100vh'>
      <div>{resultSearch}</div>
    </Container>
  );
}

export default Search;
