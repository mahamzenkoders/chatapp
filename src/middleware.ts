import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;

  const { pathname } = req.nextUrl.clone();

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/chat', req.url));
  }
  const publicRoutes = ["/auth/register", "/auth/register"];

  const protectedRoutes = ["/",'/chat'];

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|static|favicon.ico|assets|favicon|manifest.json|_next).*)',
  ],
};
