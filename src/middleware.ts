import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'


export default async function middleware(request: NextRequest) {

    const current_req = request.nextUrl.pathname;
    const accessToken = request.cookies.get('accessToken')?.value;

    const authrouts = [
        "/login",
        "/forget-password",
        "/reset-password",
        "/verify-email"
    ]

    const ispublic = authrouts.some(rout => current_req.startsWith(rout));

    if (!accessToken && !ispublic) {
        return NextResponse.redirect(new URL(`/login?next=${current_req}`, request.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};