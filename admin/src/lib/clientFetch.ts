'use client';

import { auth } from '@/lib/firebase';
import { getFirebaseTokenForRequest } from '@/lib/firebaseAdmin';
import { redirect } from 'next/navigation';

/**
 * To make authenticated requests to API on client
 */
export const clientFetchApiWithAuth = async <T>(
  url: string,
  params?: RequestInit & { query?: Record<string, string> },
) => {
  let finalUrl = process.env.NEXT_PUBLIC_API_URL! + url;
  if (params?.query) finalUrl += '?' + new URLSearchParams(params.query);
  const idToken = await auth.currentUser?.getIdToken();
  const result = await fetch(finalUrl, {
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

  const data = await result.json();

  if (result.status !== 200 && result.status !== 201) {
    throw new Error(data?.message as string);
  }

  return data as T;
};
