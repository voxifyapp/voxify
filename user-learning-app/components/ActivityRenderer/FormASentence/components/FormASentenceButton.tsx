import { Button } from '@voxify/design_system/button';
import { styled } from 'tamagui';

export const FormASentenceButton = styled(Button, {
  name: 'FillInTheBlanksButton',
  height: '$size.4',
  fontSize: '$4',
  borderRadius: '$radius.4',
  elevation: '$0.25',
  variants: {
    disabled: {
      true: {
        backgroundColor: '$color.gray5',
        pressStyle: {
          backgroundColor: '$color.gray5',
        },
      },
    },
    wordUsed: {
      true: {
        backgroundColor: '$color.gray1',
        color: '$color.gray1',
        elevation: '$0',
      },
    },
  },
});
