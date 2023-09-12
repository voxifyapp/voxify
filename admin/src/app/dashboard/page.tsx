import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { headers, cookies } from 'next/headers';
import { getToken } from 'next-auth/jwt';
import { getFirebaseTokenForRequest } from '@/lib/firebaseAdmin';

export default async function Dashboard() {
  const token = await getFirebaseTokenForRequest();

  return <h1>Dashboard</h1>;
}
