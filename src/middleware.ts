import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/api/thumbnails')) {
        console.log('thumbnail api called: ',  request.url)
        const response = NextResponse.next();
        response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=300');

        return response;
    }

    return NextResponse.next();
}