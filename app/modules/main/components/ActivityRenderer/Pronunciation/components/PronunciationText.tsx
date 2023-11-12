import { H1 } from '@voxify/design_system/typography';
import { styled } from 'tamagui';

export const PronunciationText = styled(H1, {
  color: '$primaryTextColor',
  padding: '$1.5',
  paddingBottom: '0',
  textAlign: 'center',
  variants: {
    hasMatched: {
      true: {
        backgroundColor: '$color.green',
        color: 'white',
      },
    },
  },
});
