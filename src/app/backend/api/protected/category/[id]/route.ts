import { NextResponse, NextRequest } from "next/server";
import { deleteById, updateById, getCategoryById } from "@/app/backend/services/categoryService";
import { PieceCategory } from "@/app/backend/types/models/entity";

export async function GET(request: NextResponse, { params }: { params: { id: string } }): Promise<NextResponse<PieceCategory | { error: string }>> {
    try {
        const { id } = await params;
        const category = await getCategoryById(id);

        return NextResponse.json(
            category,
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Ha ocurrido un error interno" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const categoryDelete = await deleteById(id);

        return NextResponse.json(
            categoryDelete,
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Ha ocurrido un error interno" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const data = await request.json();
        const categoryUpdate = await updateById(id, data);

        return NextResponse.json(
            categoryUpdate,
            { status: 200 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Ha ocurrido un error interno" },
            { status: 500 }
        );
    }
}