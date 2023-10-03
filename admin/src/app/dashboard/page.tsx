import { getFirebaseTokenForRequest } from '@/lib/firebaseAdmin';

export default async function Dashboard() {
  const token = await getFirebaseTokenForRequest();

  return <h3>Dashboard</h3>;
}
