import React from 'react';

import { Spinner, XStack } from 'tamagui';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};
/**
 * Container to handle loading states throughout the app
 */
export const LoadingContainer = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <XStack width="100%" alignItems="center" justifyContent="center" p="$4">
        <Spinner color="$color.blue5" size="large" />
      </XStack>
    );
  }

  return children;
};
