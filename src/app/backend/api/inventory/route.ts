import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreatePieces, CustomPieces, InformationPieces, PieceCategory, UbicationPiece } from '../../types/models/entity';

export async function GET(): Promise<NextResponse<CustomPieces[] | { error: string }>> {
  try {
    const inventory = await prisma.pieces.findMany();

    if (!inventory.length) {
      return NextResponse.json(
        { error: 'Productos no registrados' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      inventory,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Ha ocurrido un error interno' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: CreatePieces = await req.json();

    const newPiece = await prisma.pieces.create({
      data: {
        ...body
      }
    });

    return NextResponse.json(
      newPiece,
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Ha ocurrido un error interno' },
      { status: 500 }
    );
  }
}