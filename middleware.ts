
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {
  const bypassAuthForDevelopment = process.env.NODE_ENV === 'development';
  const token = request.cookies.get('auth_token')?.value;
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin-backoffice');

  // Protege rotas de dashboard (já existente)
  if (!bypassAuthForDevelopment && !token && (isDashboardRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!bypassAuthForDevelopment && token && (isDashboardRoute || isAdminRoute)) {
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
    // Proteção extra para admin-backoffice: só admins
    if (isAdminRoute) {
  const userId = typeof decodedToken.userId === 'string' ? decodedToken.userId : String(decodedToken.userId);
  const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user || !user.isAdmin) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin-backoffice/:path*', '/login', '/register', '/register-test', '/debug'],
};
