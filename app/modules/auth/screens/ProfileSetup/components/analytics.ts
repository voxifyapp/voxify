import analytics from '@react-native-firebase/analytics';
import { ProficiencyLevel } from '@voxify/types/auth/profile';

export const firebaseAnalyticsBasicInformationSubmitted = async () => {
  await analytics().logEvent('profile_setup_basic_information_submitted');
};

export const firebaseAnalyticsProficiencySubmitted = async ({
  proficiencyLevel,
}: {
  proficiencyLevel: ProficiencyLevel;
}) => {
  await analytics().setUserProperty('proficiency_level', proficiencyLevel);
  await analytics().logEvent('profile_setup_proficiency_submitted', {
    proficiencyLevel,
  });
};

export const firebaseAnalyticsFreeTrialStarted = async ({
  days,
}: {
  days: number;
}) => {
  await analytics().logEvent('profile_setup_free_trial_started', { days });
};
