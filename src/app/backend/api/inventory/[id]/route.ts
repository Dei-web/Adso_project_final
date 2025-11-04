import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { InformationPieces, PieceCategory, UbicationPiece } from '../../../types/models/entity';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id, 10);

        const piece = await prisma.pieces.findUnique({
            where: { id }
        });

        if (!piece) {
            return NextResponse.json({ error: 'Pieza inexistente' }, { status: 404 });
        }

        await prisma.pieces.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'La pieza seleccionada a sido eliminada correctamente' }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        );
    }
}