import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
    return new NextResponse(JSON.stringify({ message: 'This is a GET response' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
