import React, {useEffect, useState} from 'react';
import {Box, Container, Flex, Grid, GridItem, Heading, Text} from '@chakra-ui/react';
import {useLocation} from 'react-router-dom';
import {fetcher} from '../api/fetcher';
import {components} from '../api/typings/api';
import MovieCard from 'src/Components/Cards/MovieCards';
import styles from './GlobalStyle.module.css';
import Loader from 'src/Components/Loader/loader';

let resultSearch: string;

function Search() {
  const [movies, setMovies] = useState<components['schemas']['MovieListResponse']>();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  if (location.search.split('=')[0].includes('q')) {
    resultSearch = decodeURI(location.search.split('=')[1]);
  }

  const getSearchResult = async () => {
    const searchResult = fetcher.path('/movies').method('get').create();
    let querySearch: object = {};
    if (resultSearch !== undefined) {
      querySearch = {
        'filters[title][$contains]': resultSearch,
        'populate[0]': 'poster',
        'populate[1]': 'bigposter',
        'populate[2]': 'Logo',
        'populate[3]': 'trailer',
        'populate[4]': 'actors',
        'populate[5]': 'categories',
        'populate[6]': 'realisators',
        'populate[7]': 'age',
        'pagination[pageSize]': 12,
      };
    }
    const {data: moviesArray} = await searchResult(querySearch);
    if (moviesArray !== undefined) {
      setIsLoaded(true);
      setMovies(moviesArray);
    }
  };

  useEffect(() => {
    getSearchResult();
    return () => {
      setIsLoaded(false);
    };
  }, [resultSearch]);

  return (
    <Container maxW="container.xxl" as="section" bgColor="#181818" color="white" minH="100vh">
      <Box className={styles.searchContainer}>
        <Heading size="md" color="gray.400" w="fit-content" mt="15px" ml="20px">
          Résultat de recherche pour:
          <Text color="white">{resultSearch}</Text>
        </Heading>
        <Flex flexWrap="wrap" alignItems="center" gap={2} mt="4rem">
          {isLoaded ? (
            movies?.data?.map((movie: components['schemas']['MovieResponse']['data']) => (
              <Flex
                key={movie?.id}
                alignItems="center"
                width={{
                  xl: '234px',
                  '2xl': '266px',
                }}
                className={styles.fadeInContainer}>
                <MovieCard movie={movie} />
              </Flex>
            ))
          ) : (
            <Loader />
          )}
        </Flex>
      </Box>
    </Container>
  );
}

export default Search;
