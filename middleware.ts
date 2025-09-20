import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(request: NextRequest) {
  const bypassAuthForDevelopment = process.env.NODE_ENV === 'development';
  const token = request.cookies.get('auth_token')?.value;
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (!bypassAuthForDevelopment && !token && isDashboardRoute) {
    console.log('Middleware: No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!bypassAuthForDevelopment && token && isDashboardRoute) {
    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      console.log('Middleware: Token verification error, redirecting to login');
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/register-test', '/debug'],
};
