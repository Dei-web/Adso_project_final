import { NextResponse, NextRequest } from "next/server";
import { sessionExist } from "@/app/backend/services/authServices";

export async function POST(request: NextRequest) {
    try {
        const getSession = await request.json();
        const email = await getSession.email;
        const data = await sessionExist(email);

        return NextResponse.json(
            data,
            { status: 200 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }            
        )
    }
}