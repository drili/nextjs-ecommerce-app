import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from "@/lib/mongodb";
import { Store } from '@/models/Store';

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const userId = params.userId
        const db = await connectToDatabase()
        const stores = await db.collection("store").find({ userId }).toArray()

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

export async function POST(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const body = await req.json()
        console.log({ body });

        const userId = params.userId
        const { storeName } = body

        console.log({ userId, storeName });


        if (!storeName || !userId) {
            return new NextResponse(JSON.stringify({ message: 'Store name or User ID are missing' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const db = await connectToDatabase()
        const newStore = {
            userId,
            storeName
        }

        await db.collection("store").insertOne(newStore)

        return new NextResponse(JSON.stringify({
            message: "Store created successfully",
            store: newStore,
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        }))
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}