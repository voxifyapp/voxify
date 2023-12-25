import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ArrowBigRight } from "@tamagui/lucide-icons";
import { Button } from "design_system/button";
import { Screen } from "design_system/layout";
import { H2, Paragraph, SizableText } from "design_system/typography";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { Spacer, XStack, YStack } from "tamagui";

export default function SignIn() {
  const animation = useRef(null);

  return (
    <Screen noPadding>
      <YStack flex={1}>
        <LottieView
          autoPlay
          style={{ width: "100%", height: "100%" }}
          ref={animation}
          source={require("assets/lottie/communication.json")}
        />
      </YStack>
      <YStack backgroundColor="white" p="$6" elevation="$6">
        <H2 maxWidth="$size.24" fontWeight="bold">
          Learn how to speak better
        </H2>
        <Paragraph mt="$space.1">
          Master everyday English with real world scenarios
        </Paragraph>
        <Spacer size="$6" />
        <Button
          alignSelf="flex-end"
          onPress={async () => {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({
              showPlayServicesUpdateDialog: true,
            });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
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
