import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Search from './views/Search';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<Search />}></Route>
    </Routes>
  );
}

export default App;
