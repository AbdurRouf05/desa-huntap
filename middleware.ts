import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const pathname = url.pathname;

  // Cek Auth Cookie
  const hasAuthCookie = request.cookies.has('cp_auth');

  // Deteksi jika diakses melalui subdomain cp.* (misal cp.localhost:3001)
  const isCpSubdomain = hostname.startsWith('cp.');

  // === Akses via subdomain cp.* ===
  if (isCpSubdomain) {
    const isLoginPage = pathname === '/login';

    if (!hasAuthCookie && !isLoginPage) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    if (hasAuthCookie && isLoginPage) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    if (!pathname.startsWith('/cp')) {
      url.pathname = `/cp${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // === Akses via domain utama ke /cp/* ===
  if (pathname.startsWith('/cp')) {
    const isLoginPage = pathname === '/cp/login';

    // Jika belum login & bukan di halaman login, redirect ke login
    if (!hasAuthCookie && !isLoginPage) {
      url.pathname = '/cp/login';
      return NextResponse.redirect(url);
    }

    // Jika sudah login tapi mengakses halaman login, redirect ke dashboard
    if (hasAuthCookie && isLoginPage) {
      url.pathname = '/cp';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public assets like images
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png|.*\\.jpg|.*\\.jpeg).*)',
  ],
};
