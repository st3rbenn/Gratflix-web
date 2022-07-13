import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import Home from './views/Home';
import Search from './views/Search';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='*' element={<Navigate to='/browse' replace />} />
        <Route path='/browse' element={<Home />}></Route>
        <Route path='/search' element={<Search />}></Route>
      </Routes>
    </>
  );
}

export default App;
