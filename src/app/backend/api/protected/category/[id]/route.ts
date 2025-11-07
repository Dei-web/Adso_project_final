import { NextResponse, NextRequest } from "next/server";
import { ModifyCategory, PieceCategory } from "@/app/backend/types/models/entity";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const category = await request.json();
}