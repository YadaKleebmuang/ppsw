import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Since we are using Firebase Auth (client-side usually), doing proper SSR middleware requires cookies.
  // For a portfolio admin, we can do a simple check on a custom cookie or just let client-side protect the route.
  // We'll enforce a client-side layout guard, but here we can at least ensure we redirect /admin to /admin/dashboard
  
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // To secure via middleware properly with Firebase, we would need to set a cookie on login
  // and check it here. Let's assume we rely heavily on client-side AuthProvider for the portfolio.
  // We'll leave the middleware lightweight.
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
