import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { UserDetails } from './model/UserDetails';
import { decodeJWT } from './utils/DecodeJwt';

export function middleware(request: NextRequest) {

    const token = request.cookies.get("Token");

    let userDetails: UserDetails | undefined;
    if (token !== undefined) {
        userDetails = decodeJWT(token.value);
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