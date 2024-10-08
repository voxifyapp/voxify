import React from 'react';

import {
  getTokens,
  SizableTextProps,
  styled,
  Text,
  SizableText as TSizableText,
} from 'tamagui';

export const SizableText = styled(TSizableText, {
  name: 'SizableText',
  color: '$primaryTextColor',
});

export const H1 = (props: SizableTextProps) => (
  <Text fontSize="$10" {...props} />
);

export const H2 = (props: SizableTextProps) => (
  <Text
    fontSize="$9"
    color="$color.blue10"
    // lineHeight={getTokens().space[9].val + getTokens().space['$-4'].val}
    {...props}
  />
);

export const H3 = (props: SizableTextProps) => (
  <Text
    fontSize="$8"
    color="$color.blue10"
    // lineHeight={getTokens().space[9].val + getTokens().space['$-5'].val}
    {...props}
  />
);

export const H4 = (props: SizableTextProps) => (
  <SizableText
    size="$7"
    lineHeight={getTokens().space[9].val + getTokens().space['$-5'].val}
    {...props}
  />
);

export const H5 = (props: SizableTextProps) => (
  <SizableText
    size="$5"
    lineHeight={getTokens().space[9].val + getTokens().space['$-6'].val}
    {...props}
  />
);

export const Paragraph = (props: SizableTextProps) => (
  <Text
    fontSize="$5"
    color="$color.blue10"
    lineHeight={getTokens().space[5].val}
    {...props}
  />
);

export const Subtext = (props: SizableTextProps) => (
  <SizableText size="$4" lineHeight={getTokens().space[4].val} {...props} />
);
