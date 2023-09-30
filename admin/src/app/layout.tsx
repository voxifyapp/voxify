'use client';

import type { Metadata } from 'next';
import './globals.css';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(async firebaseUser => {
      if (!firebaseUser) {
        router.replace('/login');
      } else {
      }
      setUser(firebaseUser);
    });
    return subscriber; // unsubscribe on unmount
  }, [router]);
  return (
    <html lang="en">
      <body>{user && children}</body>
    </html>
  );
}
