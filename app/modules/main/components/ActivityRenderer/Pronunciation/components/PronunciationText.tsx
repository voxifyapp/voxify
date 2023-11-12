import { H1 } from '@voxify/design_system/typography';
import { H5, styled } from 'tamagui';

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

export const PronunciationStatusTablet = styled(H5, {
  color: 'white',
  p: '$2',
  paddingVertical: '$2',
  paddingHorizontal: '$4',
  borderRadius: '$10',
  textAlign: 'center',
  fontWeight: 'bold',
  variants: {
    status: {
      listening: {
        backgroundColor: '$color.blue',
      },
      success: {
        backgroundColor: '$color.green',
      },
      error: {
        backgroundColor: '$color.orange',
      },
    },
  },
});
