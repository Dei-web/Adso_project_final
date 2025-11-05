import { NextResponse, NextRequest } from "next/server";
import { CreateSession } from '../../../types/models/entity';
import { createSession, updateById } from "@/app/backend/services/authServices";

export async function POST(req: NextRequest) {
    try {
        const body: CreateSession = await req.json();

        const data = await createSession(body);

        return NextResponse.json(
            data,
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest) {
    try {
        const newSession = await request.json();
        const email = await newSession.email;
        const data = await updateById(email, newSession);

        return NextResponse.json(
            data,
            { status: 200 }
        )
    } catch {
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        )
    }
}