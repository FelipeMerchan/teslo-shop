import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const requestedPage = request.nextUrl.pathname;

    if (requestedPage.startsWith('/checkout/')) {
        const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

        if (!session) {
            const url = request.nextUrl.clone();
            url.pathname = '/auth/login';
            url.search = `?p=${requestedPage}`
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
        
    }

    /* // Version personalizada de la autenticacion:
    if (requestedPage.startsWith('/checkout/')) {
        const token = request.cookies.get('token');
        try {
            await jwtVerify(token || '', new TextEncoder().encode(process.env.JWT_SECRET_SEED || ''));
            return NextResponse.next();
        } catch (error) {
            const url = request.nextUrl.clone();
            url.pathname = '/auth/login';
            url.search = `?p=${requestedPage}`
            return NextResponse.redirect(url);
        }
    } */
}

export const config = {
    matcher: '/checkout/:path',
};
