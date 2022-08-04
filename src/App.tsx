import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {MovieModal} from './Components/modals/MovieModal';
import Preview from './Components/modal_preview/Preview';
import Home from './views/Home';
import Search from './views/Search';

interface locationState {
  background: {
    search: string;
  };
  preview: {
    search: string;
  };
}

function App() {
  const location = useLocation();
  const {background} = (location.state as locationState) || {};
  const {preview} = (location.state as locationState) || {};
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
      {preview && (
        <Routes>
          <Route path=":preview" element={<Preview key={preview.search} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
