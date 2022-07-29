import {Fetcher} from 'openapi-typescript-fetch';
import {paths} from './typings/api';

const baseUrl = `${process.env.REACT_APP_GRATFLIX_API_URL}/api` || 'http://localhost:3001/api';
// declare fetcher for paths
const fetcher = Fetcher.for<paths>();
fetcher.configure({
  baseUrl,
  init: {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.REACT_APP_GRATFLIX_API_KEY,
    },
  },
});

export {fetcher};
