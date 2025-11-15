import { NextRequest, NextResponse } from "next/server";
import { vehicleChecklistService } from "../../../../services/vehicleChecklistServices";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const item = await vehicleChecklistService.find(parseInt(id, 10));
    return NextResponse.json(item);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const data = await req.json();
    const result = await vehicleChecklistService.update(parseInt(id, 10), data);
    return NextResponse.json(result);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const result = await vehicleChecklistService.delete(parseInt(id, 10));
    return NextResponse.json(result);
}