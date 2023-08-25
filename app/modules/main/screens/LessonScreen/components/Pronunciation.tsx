import { PronunciationActivity } from '@voxify/common/activities/pronunciation-activity';
import { H2, YStack } from 'tamagui';

type Props = {
  activity: PronunciationActivity;
};

export const Pronunciation = ({ activity }: Props) => {
  return (
    <YStack alignItems="center">
      <H2>{activity.getPrompt().text}</H2>
    </YStack>
  );
};
