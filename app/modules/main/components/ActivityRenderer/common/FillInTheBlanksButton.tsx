import { Button, styled } from 'tamagui';

export const FillInTheBlanksButton = styled(Button, {
  name: 'FillInTheBlanksButton',
  height: '$size.4',
  fontSize: '$4',
  borderRadius: '$radius.4',
  elevation: '$0.25',
  pressStyle: {
    backgroundColor: '#eeeeee',
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: '$disabledButtonBackground',
        pressStyle: {
          backgroundColor: '$disabledButtonBackground',
        },
      },
    },
    wordUsed: {
      true: {
        backgroundColor: '#eeeeee',
        color: '#eeeeee',
        elevation: '$0',
        pressStyle: {
          backgroundColor: '#eeeeee',
        },
      },
    },
  },
});
