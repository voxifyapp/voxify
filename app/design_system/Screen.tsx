import React from 'react';
import { YStack, YStackProps, styled } from 'tamagui';

export const ScreenYStack = styled(YStack, {
  name: 'ScreenYStack',
  backgroundColor: '$background',
});

/**
 * This should be the root view of each screen
 */
export const Screen = ({
  ...props
}: { children?: React.ReactNode } & YStackProps) => {
  return <ScreenYStack {...props} fullscreen />;
};
