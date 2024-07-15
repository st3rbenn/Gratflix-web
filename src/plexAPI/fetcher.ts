import {GetServerCapabilitiesResponse} from '@lukehagar/plexjs';
import {plexAPI} from './api';

const getServerCapabilities = async (): Promise<GetServerCapabilitiesResponse> => {
  return await plexAPI.server.getServerCapabilities();
};

const getRecentlyAdded = async (): Promise<void> => {
  const recentlyAdded = await plexAPI.library.getRecentlyAdded();
  console.log(recentlyAdded);
};

export {getServerCapabilities, getRecentlyAdded};
