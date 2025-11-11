import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { GetServices } from "@/app/backend/types/models/entity";
import { deleteServices, getServicesById } from "@/app/backend/services/servicesPageService";
import { updateById } from "@/app/backend/services/servicesPageService";

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<GetServices | null | { error: string }>> {
    try {
        const { id } = await params;
        const service = await getServicesById(id);

        return NextResponse.json(
            service,
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
        const data: Prisma.ServicesUpdateInput = await request.json();
        const serviceUpdate = await updateById(id, data);

        return NextResponse.json(
            serviceUpdate,
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<boolean | { error: string }>> {
    try {
        const { id } = await params;
        const serviceDelete = await deleteServices(id);

        return NextResponse.json(
            serviceDelete,
            { status: 200 }
        )
    } catch {
        return NextResponse.json(
            { error: "Ha ocurrido un error interno" },
            { status: 500 }
        )
    }
}