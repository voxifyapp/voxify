'use client';

import './globals.css';
import { useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(async firebaseUser => {
      if (!firebaseUser) {
        router.replace('/login');
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [router]);
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
