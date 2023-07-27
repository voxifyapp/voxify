import { authAxios } from '@voxify/axiosClient';

export const fetchOrCreateProfile = async () => {
  return authAxios.post('/profile');
};
