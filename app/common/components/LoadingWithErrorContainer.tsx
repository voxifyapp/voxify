import { H5 } from '@voxify/design_system/typography';
import React from 'react';

import { Card, Spinner, XStack } from 'tamagui';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
  error?: any | null;
};
/**
 * Container to handle loading states throughout the app
 */
export const LoadingWithErrorContainer = ({
  isLoading,
  children,
  error,
}: Props) => {
  if (isLoading) {
    return (
      <XStack width="100%" alignItems="center" justifyContent="center" p="$4">
        <Spinner color="$color.blue5" size="large" />
      </XStack>
    );
  }

  if (error) {
    return (
      <Card p="$4">
        <H5>There was an error. {error?.message}</H5>
      </Card>
    );
  }

  return children;
};
