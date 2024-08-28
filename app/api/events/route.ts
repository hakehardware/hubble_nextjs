import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const events = await prisma.event.findMany({
        orderBy: { eventTime: 'desc'}
    })
    return NextResponse.json(events)
}