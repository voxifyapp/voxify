'use client';

import { AppBar, Container, Stack, Toolbar } from '@mui/material';
import Link from 'next/link';
import { QueryClient, QueryClientProvider } from 'react-query';

const pages = [
  {
    href: '/dashboard/courses',
    label: 'Courses',
  },
  {
    href: '/dashboard/units',
    label: 'Units',
  },
  {
    href: '/dashboard/lessons',
    label: 'Lessons',
  },
];

const queryClient = new QueryClient();

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <AppBar>
          <Container>
            <Toolbar>
              <Stack direction="row" spacing={2}>
                {pages.map(page => (
                  <Link href={page.href} key={page.label}>
                    {page.label}
                  </Link>
                ))}
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
        <div style={{ marginTop: '84px' }}>{props.children}</div>
      </Stack>
    </QueryClientProvider>
  );
}
