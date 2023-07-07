import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type AppContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
};

// Create a context
const AuthContext = createContext<AppContextType | null>(null);

// Create a provider which will hold our global state
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppContextType['user']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  const value = { user, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook that enables any component to subscribe to auth state
export const useAppContext = () => useContext(AuthContext) as AppContextType;
