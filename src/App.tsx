import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {MovieModal} from '../src/Components/modals/MovieModal';
import Home from './views/Home';
import Search from './views/Search';
import Movie from './views/Movie';
import Header from '../src/Components/header/Header';

interface locationState {
  background: {
    search: string;
  };
  MoviePath: {
    search: string;
  };
}

function App() {
  const location = useLocation();
  const {background} = (location.state as locationState) || {};

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/browse" replace />} />
        <Route path="/browse" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watch/:id" element={<Movie />} />
      </Routes>
      {background && (
        <Routes>
          <Route path=":movie" element={<MovieModal isOpen={true} key={background.search} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
