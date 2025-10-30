import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client';

export async function GET() {
  const clients = await PrismaClient.Client.findMany();
  return NextResponse.json(clients);
}