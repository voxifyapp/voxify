import { Screen } from "design_system/layout";
import { H1, H2, Paragraph, SizableText } from "design_system/typography";
import { Button } from "design_system/button";
import { Spacer, View, XStack, YStack } from "tamagui";
import { ArrowBigRight } from "@tamagui/lucide-icons";

export default function SignIn() {
  return (
    <Screen>
      <YStack flex={1} />
      <YStack>
        <H2 maxWidth="$size.24" fontWeight="bold">
          Learn how to speak better
        </H2>
        <Paragraph mt="$space.2">
          Master everyday English with real world scenarios
        </Paragraph>
        <Spacer size="$6" />
        <Button
          alignSelf="flex-end"
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
          <XStack space="$2" alignItems="center">
            <SizableText fontWeight="bold" col="white">
              Start learning now
            </SizableText>

            <ArrowBigRight scale={1.2} />
          </XStack>
        </Button>
        <Spacer height="$1" />
      </YStack>
    </Screen>
  );
}
