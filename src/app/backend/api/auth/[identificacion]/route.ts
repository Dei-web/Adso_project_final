import { NextResponse, NextRequest } from "next/server";
import { CustomSession } from '../../../types/models/entity';
import { getSessionById } from "@/app/backend/services/authServices";

export async function GET(request: NextRequest, { params }: { params: { identificacion: string } }): Promise<NextResponse<CustomSession | { error: string }>> {
    try {
        const identificacion = await params.identificacion;
        const data = await getSessionById(identificacion);

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