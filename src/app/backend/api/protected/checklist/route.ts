import { NextResponse } from "next/server";
import { vehicleChecklistService } from "../../../services/vehicleChecklistServices";
import { CreateChecklist } from "@/app/backend/types/models/entity";

export async function GET() {
  const list = await vehicleChecklistService.list();
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const body: CreateChecklist = await req.json();
  const result = await vehicleChecklistService.create(body);
  return NextResponse.json(result);
}
