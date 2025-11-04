import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ModifyPieces, InformationPieces, PieceCategory, UbicationPiece, CustomPieces } from '../../../types/models/entity';

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
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<CustomPieces | { error: string }>> {
    try {
        const id = parseInt(params.id, 10);

        const piece = await prisma.pieces.findUnique({
            where: { id }
        });

        if (!piece) {
            return NextResponse.json(
                { error: 'No se ha encontrado la pieza especificada' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            piece,
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        )
    }
}

function cleanData<T extends Record<string, unknown>>(data: T): Partial<T> {
    const cleaned = Object.fromEntries(
        Object.entries(data).filter(([__, v]) => v !== undefined)
    );
    return cleaned as Partial<T>;
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const input = await request.json();
    const data = cleanData(input);
    const id = parseInt(params.id, 10);

    if (Object.keys(data).length === 0) {
        return NextResponse.json(
            { messsage: 'No se proporcionaron campos para actualizar' },
            { status: 404 }
        );
    }

    try {
        await prisma.pieces.update({
            where: { id },
            data
        });

        return NextResponse.json(
            { message: 'Campos actualizados correctamente' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        )
    }
}