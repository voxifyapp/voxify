import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { headers, cookies } from 'next/headers';
import { getToken } from 'next-auth/jwt';
import { getFirebaseTokenForRequest } from '@/lib/firebaseAdmin';

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions);
  const token = await getFirebaseTokenForRequest();

  if (!session) {
    redirect('/login');
  }

  return <h1>Dashboard</h1>;
}
