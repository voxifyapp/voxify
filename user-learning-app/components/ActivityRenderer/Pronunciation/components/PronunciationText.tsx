import { SizableText } from '@voxify/design_system/typography';
import { H5, styled } from 'tamagui';

export const PronunciationText = styled(SizableText, {
  color: '$primaryTextColor',
  padding: '$1',
  paddingRight: '$1.5',
  fontSize: 38,
  lineHeight: 44,
  paddingBottom: '0',
  fontWeight: 'bold',
  textAlign: 'center',
  variants: {
    hasMatched: {
      true: {
        backgroundColor: '$color.green5',
        color: 'white',
      },
    },
    term: {
      firstTerm: {
        paddingLeft: '$3',
      },
      lastTerm: { paddingRight: '$3' },
    },
  },
});

export const PronunciationStatusTablet = styled(H5, {
  color: 'white',
  p: '$2',
  paddingVertical: '$2',
  backgroundColor: 'gray',
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
        backgroundColor: '$color.green5',
      },
      error: {
        backgroundColor: '$color.orange',
      },
    },
  },
});
