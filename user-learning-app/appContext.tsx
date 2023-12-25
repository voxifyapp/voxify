import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  FETCH_OR_CREATE_PROFILE_QUERY,
  fetchOrCreateProfile,
} from "@voxify/api/auth/profile";
import { authAxios } from "@voxify/axiosClient";
import { ProfileEntity } from "@voxify/types/auth/profile";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";

export type AppContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  profile?: ProfileEntity;
};

// Create a context
const AppContext = createContext<AppContextType | null>(null);

// Create a provider which will hold our global state
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppContextType["user"]>(null);
  const [firebaseUserLoading, setFirebaseUserLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Set the auth header for all requests
        const token = await firebaseUser.getIdToken();
        authAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
      setUser(firebaseUser);
      setFirebaseUserLoading(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  const { data: profileData, isLoading: profileDataLoading } = useQuery({
    queryKey: FETCH_OR_CREATE_PROFILE_QUERY,
    queryFn: fetchOrCreateProfile,
    enabled: !!user,
  });

  const value = {
    user,
    loading: firebaseUserLoading || profileDataLoading,
    profile: profileData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook that enables any component to subscribe to auth state
export const useAppContext = () => useContext(AppContext) as AppContextType;
