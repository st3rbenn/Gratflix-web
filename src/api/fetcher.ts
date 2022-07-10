import { Fetcher } from 'openapi-typescript-fetch';
import { paths } from './typings/api';

const baseUrl = 'https://api-gratflix.onrender.com/api' || 'http://localhost:3001/api';
// declare fetcher for paths
const fetcher = Fetcher.for<paths>();
fetcher.configure({
  baseUrl,
  init: {
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer f345608527eddb1e4fd09552d1d46cc8f307958b94d15fcd33920037d3a74439d3c526f6de468f0efb2657a412ab3c4909209726695b8bfb68ae9bcdebfcdb9b664713f76e578279337a491e8845e3ca281f4a3b336c54426f472d242903e57c0245bed77fdb878e61e8444ed5e24c5f9c9874e9d21266ee9e0a21fb41ffb559',
    },
  },
});

export { fetcher };
