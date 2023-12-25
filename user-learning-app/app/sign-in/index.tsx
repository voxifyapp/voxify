import { Screen } from "design_system/layout";
import { H1, Paragraph } from "design_system/typography";
import { Button } from "design_system/button";
import { Spacer, View, YStack } from "tamagui";

export default function SignIn() {
  return (
    <Screen>
      <YStack flex={1} />
      <YStack flex={1}>
        <H1 maxWidth="$size.24" fontWeight="bold" textAlign="center">
          Learn how to speak better
        </H1>
        <Paragraph mt="$space.3" textAlign="center">
          Master everyday English with real world scenarios
        </Paragraph>
        <Spacer height="$4" />
        <Button
          alignSelf="stretch"
          onPress={async () => {
            // Check if your device supports Google Play
            // await GoogleSignin.hasPlayServices({
            //   showPlayServicesUpdateDialog: true,
            // });
            // // Get the users ID token
            // const { idToken } = await GoogleSignin.signIn();
            // // Create a Google credential with the token
            // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // // Sign-in the user with the credential
            // try {
            //   await auth().signInWithCredential(googleCredential);
            // } catch (err) {
            //   console.error(err);
            // }
          }}
        >
          Get started
        </Button>
        <Spacer height="$1" />
      </YStack>
    </Screen>
  );
}
