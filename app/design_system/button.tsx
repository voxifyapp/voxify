import { Button as TButton, styled } from 'tamagui';

export const Button = styled(TButton, {
  name: 'Button',
  borderRadius: '$radius.4',
  fontWeight: 'bold',
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
