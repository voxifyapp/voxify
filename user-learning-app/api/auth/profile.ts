import { authAxios } from 'axiosClient';
import { ProficiencyLevel, ProfileEntity } from 'types/auth/profile';

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

export const GET_COURSE_FOR_PROFILE = 'GET_COURSE_FOR_PROFILE';
export const getCourseForProfile = async (): Promise<any> => {
  return (await authAxios.get('lms/courses/current-course-for-profile')).data;
};
