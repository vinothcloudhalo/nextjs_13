import { ImageResponse, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {

    return NextResponse.json(
        { timestamp: new Date().toLocaleTimeString() }, 
        { 
            status: 200,  
            headers: {
                'Cache-Control': 'public, max-age=60, s-maxage=60',
            }
        }
    )
}
