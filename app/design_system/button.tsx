import { Button as TButton, styled } from 'tamagui';

export const Button = styled(TButton, {
  name: 'Button',
  fontWeight: 'bold',
  fontSize: '$6',
  height: '$size.5',
  adjustsFontSizeToFit: true,
  borderRadius: '$radius.6',
});
