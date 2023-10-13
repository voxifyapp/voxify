import React from 'react';

import { SizableTextProps, styled, SizableText as TSizableText } from 'tamagui';

export const SizableText = styled(TSizableText, {
  name: 'SizableText',
  color: '$primaryTextColor',
});

export const H1 = (props: SizableTextProps) => (
  <SizableText size="$10" {...props} />
);
