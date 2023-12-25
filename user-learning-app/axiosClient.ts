import { Constants } from '@voxify/appConstants';
import axios from 'axios';

/**
 * Axios client to make any authenticated request
 */
export const authAxios = axios.create({
  baseURL: Constants.VOXIFY_API_ENDPOINT,
});
