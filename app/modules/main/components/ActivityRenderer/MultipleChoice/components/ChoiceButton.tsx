import { CheckCircle2 } from '@tamagui/lucide-icons';
import { Button } from '@voxify/design_system/button';
import React, { ReactNode } from 'react';
import { styled } from 'tamagui';

const StyledChoiceButton = styled(Button, {
  name: 'StyledChoiceButton',
  variant: 'outlined',
  color: '$color.gray7',
  borderColor: '$color.gray7',
  variants: {
    checked: {
      true: {
        color: '$color.blue',
        borderColor: '$color.blue',
      },
    },
    disabled: {
      true: {
        backgroundColor: undefined,
        pressStyle: {
          backgroundColor: undefined,
        },
      },
    },
    result: {
      correct: {
        borderColor: '$color.green5',
        color: '$color.green5',
      },
      incorrect: { borderColor: '$color.orange5', color: '$color.orange5' },
    },
  },
});

type Props = {
  children: ReactNode;
  checked: boolean;
} & Omit<React.ComponentProps<typeof StyledChoiceButton>, 'icon'>;

export const ChoiceButton = ({ children, checked, ...props }: Props) => {
  return (
    <StyledChoiceButton
      checked={checked}
      scaleIcon={1.7}
      icon={
        checked ? (
          <CheckCircle2
            scale={1}
            //   color={checked ? '$color.blue' : '$color.gray7'}
          />
        ) : undefined
      }
      {...props}>
      {children}
    </StyledChoiceButton>
  );
};
