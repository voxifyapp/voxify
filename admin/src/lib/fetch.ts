import { getFirebaseTokenForRequest } from '@/lib/firebaseAdmin';
import { redirect } from 'next/navigation';

/**
 * To make authenticated requests to API
 */
export const fetchApiWithAuth = async <T>(
  url: string,
  params?: RequestInit,
) => {
  const result = await fetch(process.env.API_URL! + url, {
    ...params,
    headers: {
      Authorization: 'Bearer ' + (await getFirebaseTokenForRequest()),
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
