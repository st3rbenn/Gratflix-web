import {PlexAPI} from '@lukehagar/plexjs';
import axios from 'axios';
import {Fetcher} from 'openapi-typescript-fetch';

const plexAPI = new PlexAPI({
  accessToken: process.env.REACT_APP_PLEX_TOKEN,
  serverURL: process.env.REACT_APP_PLEX_SERVER_URL,
});

const imageFetcher = axios.create({
  baseURL: process.env.REACT_APP_PLEX_SERVER_URL,
  headers: {
    'X-Plex-Token': process.env.REACT_APP_PLEX_TOKEN,
  },
  responseType: 'blob',
});

const baseUrl = 'https://tv.arcane-sanctum.com:443';
// declare fetcher for paths
const fetcher = Fetcher.for<any>();
fetcher.configure({
  baseUrl,
  init: {
    headers: {
      'X-Plex-Token': process.env.REACT_APP_PLEX_TOKEN as string,
    },
  },
});

export {fetcher, plexAPI, imageFetcher};
