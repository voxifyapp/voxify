'use client';

import { auth } from '@/lib/firebase';
import { getFirebaseTokenForRequest } from '@/lib/firebaseAdmin';
import { redirect } from 'next/navigation';

/**
 * To make authenticated requests to API on client
 */
export const clientFetchApiWithAuth = async <T>(
  url: string,
  params?: RequestInit,
) => {
  const idToken = await auth.currentUser?.getIdToken();
  const result = await fetch(process.env.NEXT_PUBLIC_API_URL! + url, {
    ...params,
    headers: {
      Authorization: 'Bearer ' + idToken,
      'Content-Type': 'application/json',
      ...params?.headers,
    },
  });

  if (result.status === 401) {
    redirect('/login');
  }

  if (result.status !== 200 && result.status !== 201)
    throw new Error('something went wrong');

  return (await result.json()) as T;
};
