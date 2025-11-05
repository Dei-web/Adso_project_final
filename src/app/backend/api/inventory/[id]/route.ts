import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ModifyPieces, InformationPieces, PieceCategory, UbicationPiece, CustomPieces } from '../../../types/models/entity';
import { deletePiece, getPieceById, updateById } from "@/app/backend/services/piecesServices";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const data = await deletePiece(id);

        return NextResponse.json(data, { status: 200 })
    } catch {
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<CustomPieces | { error: string }>> {
    try {
        const { id } = await params;
        const data = await getPieceById(id);

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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const newPieces = await request.json();
        const { id } = await params;
        const data = updateById(id, newPieces);

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