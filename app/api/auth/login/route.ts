import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import bcrypt from 'bcryptjs';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return new NextResponse(JSON.stringify({ message: 'Email and password are required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const db = await connectToDatabase();
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return new NextResponse(JSON.stringify({ message: 'Invalid credentials' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: _, ...userData } = user;

        return new NextResponse(JSON.stringify({ token, user: userData }), {
            status: 200,
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