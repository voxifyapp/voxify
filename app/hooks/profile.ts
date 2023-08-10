import { ProfileEntity } from '@voxify/types/auth/profile';

export enum ProfileCompletionStep {
  SELECT_PROFICIENCY,
  SELECT_MEMBERSHIP,
  COMPLETE,
}

/**
 * Determines the next step in the profile completion process based on the given profile.
 * @param {ProfileEntity} profile - The user's profile.
 * @returns {ProfileCompletionStep} - The next step in the profile completion process.
 */
export const useGetCurrentProfileStep = (profile?: ProfileEntity) => {
  if (!profile) {
    return null;
  }

  if (!profile.proficiencyLevel) {
    return ProfileCompletionStep.SELECT_PROFICIENCY;
  }

  if (!profile.subscriptionEndDate) {
    return ProfileCompletionStep.SELECT_MEMBERSHIP;
  }

  return ProfileCompletionStep.COMPLETE;
};
