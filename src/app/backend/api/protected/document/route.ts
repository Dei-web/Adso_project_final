import { NextRequest, NextResponse } from "next/server";
import { createDocument, getAllDocument } from "../../../services/documentServices";

export async function POST(req: NextRequest) {
    try {
        const form: FormData = await req.formData();
        const file: File = form.get("file") as File;

        const doc = await createDocument(file);

        return NextResponse.json(
            doc,
            { status: 201 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const docs = await getAllDocument();

        return NextResponse.json(
            docs,
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: 'Ha ocurrido un error interno' },
            { status: 500 }
        )
    }
}
