import { deleteById } from "@/app/backend/services/authServices";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Promise<{id: string}> }) {
    try {
        const { id } = await context.params;

        const userEliminated = deleteById(id);

        return NextResponse.json(
            userEliminated,
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Ha ocurrido un error interno" },
            { status: 500 }
        );
    }
}