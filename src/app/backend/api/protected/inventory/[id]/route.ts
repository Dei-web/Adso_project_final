import { NextResponse, NextRequest } from "next/server";
import { deletePiece, getPieceById, updateById } from "@/app/backend/services/piecesServices";
import { Prisma } from "@prisma/client";
import { GetPieces } from "@/app/backend/types/models/entity";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const piece = await deletePiece(id);

        return NextResponse.json(piece, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const newPieces: Prisma.PiecesUpdateInput = await request.json();
        const { id } = await params;
        const piece = await updateById(id, newPieces);

        return NextResponse.json(
            piece,
            { status: 200 }
        )
    } catch {
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<GetPieces | { error: string } | null>> {
    try {
        const { id } = await params;
        const piece = await getPieceById(id);

        return NextResponse.json(
            piece,
            { status: 200 }
        )
    } catch {
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        )
    }
}