import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import {Header} from './Components/header/Header';
import reportWebVitals from './reportWebVitals';

// const theme = extendTheme({
// });

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true}>
      <Router>
        <Header />
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
reportWebVitals(console.log);
