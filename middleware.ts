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

    if (requestedPage.startsWith('/admin')) {
        const session: any = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

        if (!session) {
            const url = request.nextUrl.clone();
            url.pathname = '/auth/login';
            url.search = `?p=${requestedPage}`
            return NextResponse.redirect(url);
        }

        const validRoles = ['admin', 'super-user', 'SEO'];

        if (!validRoles.includes(session.user.role)) {
            const url = request.nextUrl.clone();
            url.pathname = '/'
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    if (requestedPage.startsWith('/api/admin/dashboard')) {
        const session: any = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

        if (!session) {
            return NextResponse.redirect(new URL('/api/auth/unautorized', request.url));
        }

        const validRoles = ['admin', 'super-user', 'SEO'];

        if (!validRoles.includes(session.user.role)) {
            return NextResponse.redirect(new URL('/api/auth/unautorized', request.url));
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
    matcher: ['/checkout/:path', '/admin', '/api/admin/:path'],
};
