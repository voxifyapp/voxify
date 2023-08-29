import React from 'react';
import { Button } from 'tamagui';

type Props = {
  onPress?: () => void;
  disabled?: boolean;
};

export const CheckAnswerButton = (
  { onPress, disabled }: Props = { disabled: false },
) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      Check Answer
    </Button>
  );
};
