import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from "@/lib/mongodb";
import { Stores } from '@/models/Stores';

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const userId = new ObjectId(params.userId)
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

export async function POST(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const body = await req.json()

        const userId = new ObjectId(params.userId)
        const { storeName } = body
        const storeNameEscaped = storeName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

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
            storeName,
            storeNameEscaped,
        }

        await db.collection("stores").insertOne(newStore)

        await db.collection("users").updateOne(
            { _id: userId },
            { $set: { activeStore: storeNameEscaped } }
        )

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