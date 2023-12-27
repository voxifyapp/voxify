import { useAppContext } from "@voxify/appContext";
import {
  ProfileCompletionStep,
  useGetCurrentProfileStep,
} from "@voxify/hooks/profile";
import { Redirect, Slot, Stack } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
  const { loading, user, profile } = useAppContext();
  const currentProfileStep = useGetCurrentProfileStep(profile);

  if (loading) return <Text>Loading...</Text>;

  if (!user) return <Redirect href="/sign-in" />;

  if (currentProfileStep != ProfileCompletionStep.COMPLETE)
    return <Redirect href="/profile-setup/" />;

  return <Slot />;
}
