import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
    async function middleware(request: NextRequestWithAuth) {


        // if (!(request.nextUrl.pathname === '/auth/signin' || request.nextUrl.pathname === '/api/auth/callback/keycloak') && token === null) {
        //   return NextResponse.redirect(new URL('/auth/signin', request.url));
        // }

        // if (token != null && token.error != 'RefreshAccessTokenError') {
        //   return NextResponse.next();
        // }

        // if (request.nextUrl.pathname.startsWith('/planosDeTrabalho') && !userDetails?.scope?.includes("ADMIN")) {
        //     return NextResponse.rewrite(new URL('/', request.url))
        // }

    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                if (!(req.nextUrl.pathname === '/auth/signin' || req.nextUrl.pathname === '/api/auth/callback/keycloak') && (token?.error === 'RefreshAccessTokenError')) {
                    return false;
                }
                return true;
            }
        }

    }
)

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