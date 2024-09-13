import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Retrieve the token from the request
  const token = await getToken({ req: request });
  // Extract the URL of the incoming request
  const url = request.nextUrl;

  // Check if the user is authenticated and is trying to access specific paths
  if (token && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up') || url.pathname.startsWith('/verify') || url.pathname === '/')) {
    // Redirect authenticated users to the /dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if(!token && url.pathname.startsWith('/dashboard')){
    return NextResponse.redirect(new URL('/sign-in',request.url));
  }
  // Continue to the next middleware or the requested resource if no conditions are met
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*', '/verify/:path*']
};
