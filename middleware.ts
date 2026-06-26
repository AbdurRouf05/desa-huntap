import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Deteksi jika diakses melalui subdomain cp.* (misal cp.localhost:3001 atau cp.domaindesa.id)
  const isCpSubdomain = hostname.startsWith('cp.');
  const pathname = url.pathname;

  // Cek Auth Cookie
  const hasAuthCookie = request.cookies.has('cp_auth');

  // Jika mengakses subdomain CP
  if (isCpSubdomain) {
    const isLoginPage = pathname === '/login';

    // 1. Enforce Login (Jika belum login & bukan di halaman login)
    if (!hasAuthCookie && !isLoginPage) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // 2. Redirect jika sudah login tapi mengakses halaman login
    if (hasAuthCookie && isLoginPage) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // 3. Rewrite URL ke folder app/cp
    // Jika user mengakses cp.localhost:3001/berita, kita arahkan ke file app/cp/berita/page.tsx
    if (!pathname.startsWith('/cp')) {
      url.pathname = `/cp${pathname === '/' ? '' : pathname}`;
      return NextResponse.rewrite(url);
    }
  } else {
    // Jika mengakses domain utama (publik)
    // Cegah akses langsung ke /cp dari domain utama agar konsisten harus via subdomain
    if (pathname.startsWith('/cp')) {
      url.pathname = '/';
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
