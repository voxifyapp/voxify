import React from 'react';
import { YStack as TYStack, styled } from 'tamagui';

export const YStack = styled(TYStack, {
  name: 'YStack',
});

export const ScreenYStack = styled(YStack, {
  name: 'ScreenYStack',
  backgroundColor: '$background',
  padding: '$screenPadding',

  variants: {
    noPadding: {
      true: { padding: 0 },
    },
  },
});

/**
 * This should be the root view of each screen
 */
export const Screen = ({
  ...props
}: { children?: React.ReactNode } & React.ComponentProps<
  typeof ScreenYStack
>) => {
  return <ScreenYStack {...props} fullscreen />;
};
