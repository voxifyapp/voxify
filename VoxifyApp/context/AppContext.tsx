import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { authAxios } from '@voxify/axiosClient';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// export enum ProfileCompletionStep {
//   SELECT_PROFICIENCY,
//   SELECT_MEMBERSHIP,
//   COMPLETE,
// }

// enum Proficiency {
//   BEGINNER,
//   MEDIUM,
//   ADVANCED,
// }

export type AppContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
};

// Create a context
const AppContext = createContext<AppContextType | null>(null);

// Create a provider which will hold our global state
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppContextType['user']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        // Set the auth header for all requests
        const token = await firebaseUser.getIdToken();
        authAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      setUser(firebaseUser);
      setLoading(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!user) {
      authAxios.defaults.headers.common.Authorization = ``;
    }
  }, [user]);

  // const { data: profileData, status } = useQuery(
  //   'profile',
  //   fetchOrCreateProfile,
  // );

  // if (status === 'success') {
  //   if (profileData.proficiencyLevel === null) {
  //     profileStep = ProfileCompletionStep.SELECT_PROFICIENCY;
  //   } else if (profileData.subscriptionEndDate === null) {
  //     profileStep = ProfileCompletionStep.SELECT_MEMBERSHIP;
  //   } else {
  //     profileStep = ProfileCompletionStep.COMPLETE;
  //   }
  // }

  const value = { user, loading };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook that enables any component to subscribe to auth state
export const useAppContext = () => useContext(AppContext) as AppContextType;
