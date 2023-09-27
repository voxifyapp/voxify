import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
export { default } from 'next-auth/middleware';

// export async function middleware(request: NextRequest) {}

export const config = { matcher: ['/dashboard/:path*'] };
