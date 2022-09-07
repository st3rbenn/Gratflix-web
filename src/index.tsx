import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);

const theme = extendTheme({
  fontSize: {
    base: '.875rem',
    sm: '1rem',
    lg: '1.2rem',
    xl: '1.4rem',
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true} theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
);
reportWebVitals(console.log);
