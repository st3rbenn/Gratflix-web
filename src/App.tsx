/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MovieModal } from './Components/Modals/MovieModal';
import Home from './views/Home';
import Search from './views/Search';

function App() {
  const location = useLocation();
  // @ts-ignore
  const background = location.state && location.state.background;
  // @ts-ignore
  const movie = location.state && location.state.movie;
  // @ts-ignore
  const landing = location.state && location.state.landing;
  return (
    <>
      <Routes location={background || location}>
        <Route path='*' element={<Navigate to='/Browse' replace />} />
        <Route path='/Browse' element={<Home />}>
          <Route path=':movie' element={<MovieModal isOpen={true} />} />
        </Route>
        <Route path='/Search' element={<Search />} />
      </Routes>
      {background && (
        <Routes>
          <Route path=':movie' element={<MovieModal isOpen={true} movie={movie} movieLanding={landing} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
