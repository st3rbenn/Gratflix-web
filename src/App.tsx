import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Search from './views/Search';

function App() {
  return (
    <Routes>
      <Route path='*' element={<Navigate to='/browse' replace />} />
      <Route path='/browse' element={<Home />}></Route>
      <Route path='/search' element={<Search />}></Route>
    </Routes>
  );
}

export default App;
