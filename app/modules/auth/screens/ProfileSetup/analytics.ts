import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

export const firebaseAnalyticsAfterLogin = async ({
  isNewUser,
  uid,
}: Pick<FirebaseAuthTypes.AdditionalUserInfo, 'isNewUser'> &
  Pick<FirebaseAuthTypes.User, 'uid'>) => {
  if (isNewUser) {
    await analytics().logSignUp({ method: 'google' });
  } else {
    await analytics().logLogin({ method: 'google' });
  }
  await analytics().setUserId(uid);
};
