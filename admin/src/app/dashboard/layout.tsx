import { AppBar, Container, Stack, Toolbar } from '@mui/material';
import Link from 'next/link';

const pages = [
  {
    href: '/dashboard/courses',
    label: 'Courses',
  },
];

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <Stack>
      <AppBar>
        <Container>
          <Toolbar>
            <Stack direction="row">
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
  );
}
