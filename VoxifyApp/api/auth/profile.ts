import { authAxios } from '@voxify/axiosClient';
import { ProfileEntity } from '@voxify/types/auth/profile';

export const FETCH_OR_CREATE_PROFILE_QUERY = 'FETCH_OR_CREATE_PROFILE_QUERY';
export const fetchOrCreateProfile = async (): Promise<ProfileEntity> => {
  return (await authAxios.post('/profile')).data;
};
