import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from "@/lib/mongodb";
import { Stores } from '@/models/Stores';

export async function POST(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const body = await req.json()
        const userId = new ObjectId(params.userId)
        const { activeStore } = body

        if (!activeStore || !userId) {
            return new NextResponse(JSON.stringify({ message: 'Store name or User ID are missing' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const db = await connectToDatabase()

        const response = await db.collection("users").updateOne(
            { _id: userId },
            { $set: { activeStore: activeStore } }
        )

        return new NextResponse(JSON.stringify({
            message: "activeStore updated successfully",
            store: response,
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        }))

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error: Cannot update activeStore' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}