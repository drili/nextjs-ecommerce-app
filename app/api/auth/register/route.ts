import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, userFirstName, userLastName } = body;

        if (!email || !password) {
            return new NextResponse(JSON.stringify({ message: 'Email and password are required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const db = await connectToDatabase();
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            return new NextResponse(JSON.stringify({ message: 'User already exists' }), {
                status: 409,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user: User = { email, password: hashedPassword, userFirstName, userLastName };
        await db.collection('users').insertOne(user);

        return new NextResponse(JSON.stringify({ message: 'User created' }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}