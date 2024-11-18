import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/api/thumbnails')) {
        console.log('thumbnail api called: ',  request.url)
        const response = NextResponse.next();
        response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=60');

        return response;
    }

    if (pathname.startsWith('/api/time')) {
        console.log('time api called: ', request.url)
        const response = NextResponse.next();
        response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=60, stale-while-revalidate=60');

        return response;
    }

    return NextResponse.next();
}