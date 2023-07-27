import axios from 'axios';

export const fetchOrCreateProfile = async () => {
  return axios.post('/profile');
};
