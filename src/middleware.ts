import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request, secret: process.env.JWT_SECRET });

    // if (!(request.nextUrl.pathname === '/auth/signin' || request.nextUrl.pathname === '/api/auth/callback/keycloak') && token === null) {
    //     return NextResponse.redirect(new URL('/auth/signin', request.url));
    // }

    if (token != null && token.error != 'RefreshAccessTokenError') {
        return NextResponse.next();
    }

    // if (request.nextUrl.pathname.startsWith('/planosDeTrabalho') && !userDetails?.scope?.includes("ADMIN")) {
    //     return NextResponse.rewrite(new URL('/', request.url))
    // }

    // if (request.nextUrl.pathname.startsWith('/usuario') && !userDetails?.scope.includes("PESSOA")) {
    //     return NextResponse.rewrite(new URL('/', request.url))
    // }

    // if (userDetails !== undefined && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/registro'))) {
    //     return NextResponse.rewrite(new URL('/', request.url))
    // }

}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}