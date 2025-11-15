import { NextResponse } from "next/server";
import { deleteDocument, getOneDocument } from "../../../../services/documentServices";

export async function GET(
    req: Request, context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const doc = await getOneDocument(id);

        return new NextResponse(
            doc.data,
            {
                headers: {
                    "Content-Type": doc.mimeType,
                    "Content-Disposition": `attachment; filename="${doc.name}"`
                },
                status: 200
            });
    } catch {
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request, context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        const success = await deleteDocument(id);

        return NextResponse.json(
            success,
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        )
    }
}
