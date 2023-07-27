import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Constants } from '@voxify/modules/Constants';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQuery } from 'react-query';

export enum ProfileCompletionStep {
  SELECT_PROFICIENCY,
  SELECT_MEMBERSHIP,
  COMPLETE
}

enum Proficiency {
  BEGINNER,
  MEDIUM,
  ADVANCED,
}

export type AppContextType = {
  user: FirebaseAuthTypes.User | null;
  profileStep: ProfileCompletionStep;
  proficiency: Proficiency;
  loading: boolean;
};

// Create a context
const AppContext = createContext<AppContextType | null>(null);

// Create a provider which will hold our global state
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppContextType['user']>(null);
  const [loading, setLoading] = useState(true);
  let proficiency: Proficiency = Proficiency.BEGINNER;
  let profileStep: ProfileCompletionStep | null = null;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  const fetchOrCreateProfile = async () => {
    const res = await fetch(Constants.VOXIFY_ENDPOINT + '/profile', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + user?.getIdToken,
      },
    });
    return res.json();
  };

  const { data: profileData, status } = useQuery(
    'profile',
    fetchOrCreateProfile,
  );

  if (status === 'success') {
    if (profileData.proficiencyLevel === null) {
      profileStep = ProfileCompletionStep.SELECT_PROFICIENCY;
    } else if (profileData.subscriptionEndDate === null) {
      profileStep = ProfileCompletionStep.SELECT_MEMBERSHIP;
    } else {
      profileStep = ProfileCompletionStep.COMPLETE;
    }
  }

  const value = { user, proficiency, profileStep, loading };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook that enables any component to subscribe to auth state
export const useAppContext = () => useContext(AppContext) as AppContextType;
