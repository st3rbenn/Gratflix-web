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
        'Bearer 5c0e39aef1e13ea76e90afca2877bc1fe631ad4ed1187283c0398fd77cad8ccc4728efccf4293cbc7f4b10ace11943bac4b20af71219abb872285a2ec1835544c769fa97eeb5de5640d4f8d52b10cd1ad787a39a187c591b5689a9a3e431384c29553d11f4723e0b1d2a847b24f660e19c710a068f9066c48d6947344e918c39',
    },
  },
});

export { fetcher };
