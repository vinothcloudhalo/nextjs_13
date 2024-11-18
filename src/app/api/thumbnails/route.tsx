import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const data = searchParams.get('data');
    const demoMail = searchParams.get('demoMail');

    if (!data) {
        return new Response('Missing data parameter', {
            status: 400,
        });
    }

    const [url, previewKey, userId] = data.split('---');

    let parsedUrl;

    if (demoMail) {
        try {
            parsedUrl = Buffer.from(url, 'base64').toString('utf-8');
        } catch (error) {
            parsedUrl = '___none';
        }
    } else {
        parsedUrl = url;
    }

    const isLinkedIn = parsedUrl.includes('linkedin.com/');

    if (isLinkedIn == false) {
        try {
            parsedUrl = parsedUrl.startsWith('http')
                ? parsedUrl
                : `https://${parsedUrl}`;
            parsedUrl = parsedUrl.replace('?', 'QID');
            parsedUrl = parsedUrl.replace('&', 'QMP');
        } catch (error) {
            parsedUrl = '___none';
        }
    }

    let speakerCircleImageUrl = `${process.env.NEXT_PUBLIC_SALESPAGES_MAIN_CDN_URL}/${previewKey}/preview.jpg`;
    let bgImageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_SHOTS_CDN_URL}/${parsedUrl}`;

    if (isLinkedIn) bgImageUrl = `${bgImageUrl}&userId=${userId}`;

    let isBgImageAvailable = false;

    try {
        const domainResponse = await fetch(bgImageUrl);
        isBgImageAvailable = domainResponse.status === 200;
    } catch(e) {}

    if(isBgImageAvailable == false) bgImageUrl = speakerCircleImageUrl;

    try {
        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    <img
                        src={bgImageUrl}
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                    {isBgImageAvailable && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 30,
                                left: 30,
                                height: 200,
                                width: 200,
                                borderRadius: 9999,
                                display: 'flex',
                            }}
                        >
                            <img
                                src={speakerCircleImageUrl}
                                style={{
                                    width: 200,
                                    height: 200,
                                    objectFit: 'cover',
                                    borderRadius: 9999,
                                }}
                            />
                        </div>
                    )}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            height: 148,
                            width: 148,
                            backgroundColor: '#ffffff6f',
                            display: 'flex',
                            borderRadius: 9999,
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                height: 128,
                                width: 128,
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 9999,
                                transform: 'rotate(90deg)',
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                viewBox="0 0 24 24"
                                fill="#555"
                                stroke="#555"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            </svg>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch(error) {
        console.error('Thumbnail generation failed:', error);

        // Failed response without caching
        return new Response('Thumbnail generation failed', {
            status: 500,
            headers: { 'Cache-Control': 'no-store, max-age=0' },
        });
    }
}
