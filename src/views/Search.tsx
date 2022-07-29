import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetcher } from '../api/fetcher';
import { components } from '../api/typings/api';

function Search() {
  const [movies, setMovies] = useState<components['schemas']['MovieListResponse']>();
  const location = useLocation();
  const resultSearch = location.search.split('=')[1];

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
    const { data: moviesArray } = await searchResult(querySearch);
    console.log(moviesArray);
    // setMovies(moviesArray);
  };

  useEffect(() => {
    getSearchResult();
  }, [resultSearch]);

  return (
    <Container maxW='container.xxl' as='section' bgColor='#181818' color='white' minH='100vh'>
      <div>{resultSearch}</div>
    </Container>
  );
}

export default Search;
