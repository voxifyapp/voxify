import React, { useState } from 'react';
import { TextInput } from 'react-native';
import Config from 'react-native-config';
import { Button, XStack } from 'tamagui';

type Props = {
  onLessonSelected: (lessonId: string) => void;
};

export const LessonSelect = ({ onLessonSelected }: Props) => {
  const [lessonIdValue, setLessonIdValue] = useState('');

  if (!Config.SHOW_DEBUG_TOOLS) {
    return null;
  }

  return (
    <XStack style={{ backgroundColor: 'white' }}>
      <TextInput
        style={{ flex: 1 }}
        value={lessonIdValue}
        onChangeText={e => setLessonIdValue(e)}
      />
      <Button onPress={() => onLessonSelected(lessonIdValue)}>Load</Button>
    </XStack>
  );
};
