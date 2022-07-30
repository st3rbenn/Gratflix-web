import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {MovieModal} from './Components/Modals/MovieModal';
import Home from './views/Home';
import Search from './views/Search';

interface locationState {
  background: {
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
      <Routes>
        <Route path="*" element={<Navigate to="/browse" replace />} />
        <Route path="/browse" element={<Home />} />
        <Route path="/search" element={<Search />} />
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
