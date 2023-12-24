import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const userId = params.userId
        const db = await connectToDatabase()
        const stores = await db.collection("stores").find({ userId }).toArray()

        console.log({stores});
        
        return NextResponse.json(stores)
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}