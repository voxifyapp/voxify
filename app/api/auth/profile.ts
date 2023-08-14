import { authAxios } from '@voxify/axiosClient';
import { ProficiencyLevel, ProfileEntity } from '@voxify/types/auth/profile';

export const FETCH_OR_CREATE_PROFILE_QUERY = 'FETCH_OR_CREATE_PROFILE_QUERY';
export const fetchOrCreateProfile = async (): Promise<ProfileEntity> => {
  return (await authAxios.post('/profile')).data;
};

export const setProficiency = async (
  proficiency: ProficiencyLevel,
): Promise<ProfileEntity> => {
  return (
    await authAxios.post('/profile/set-proficiency-level', {
      proficiencyLevel: proficiency,
    })
  ).data;
};

export const startFreeTrail = async (
  daysToAdd: number,
): Promise<ProfileEntity> => {
  return (
    await authAxios.post('/profile/add-days-to-subscription ', {
      freeTrialDays: daysToAdd,
    })
  ).data;
};
