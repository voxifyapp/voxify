import axios from 'axios';

/**
 * Axios client to make any authenticated request
 */
export const authAxios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_VOXIFY_API_ENDPOINT,
});
