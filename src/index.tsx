import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Header } from './Components/Header/Header';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <Header />
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
reportWebVitals(console.log);
