import { NextResponse, NextRequest } from "next/server";
import { ModifyPieces, CustomPieces } from '../../../types/models/entity';
import { getPieces, createPiece } from "@/app/backend/services/piecesServices";

export async function GET(): Promise<NextResponse<CustomPieces[] | { error: string }>> {
  try {
    const data = await getPieces();

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

export async function POST(req: NextRequest) {
  try {
    const body: ModifyPieces = await req.json();

    const data = await createPiece(body);

    return NextResponse.json(
      data,
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Ha ocurrido un error interno' },
      { status: 500 }
    );
  }
}