import { Button as TButton, styled } from 'tamagui';

export const Button = styled(TButton, {
  name: 'Button',
  fontWeight: 'bold',
  fontSize: '$6',
  height: '$size.5',
  borderRadius: '$radius.6',
  variants: {
    fullWidth: {
      true: { width: '100%' },
    },
    disabled: {
      true: {
        backgroundColor: '$disabledButtonBackground',
        pressStyle: {
          backgroundColor: '$disabledButtonBackground',
        },
      },
    },
  },
});
