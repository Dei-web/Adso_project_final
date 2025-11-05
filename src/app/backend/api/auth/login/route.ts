import { NextResponse, NextRequest } from "next/server";
import { getSessionById } from "@/app/backend/services/authServices";

export async function POST(request: NextRequest) {
    try {
        const getSession = await request.json();
        const email = await getSession.email;
        const data = await getSessionById(email);

        return NextResponse.json(
            data,
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }            
        )
    }
}