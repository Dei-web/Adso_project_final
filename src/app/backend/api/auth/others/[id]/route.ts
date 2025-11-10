import { NextResponse, NextRequest } from "next/server";
import { deleteById } from "@/app/backend/services/authServices";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } } ): Promise<NextResponse<boolean | { error: string }>> {
    try {
        const { id } = await params;
        const sessionEliminated = await deleteById(id);

        return NextResponse.json(
            sessionEliminated,
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Ha ocurrido un error interno" },
            { status: 500 }
        );
    }
}