export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuthedUser } from "@/lib/authServer";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuthedUser();
    console.log("GET /api/content", { userId: user.userId, email: user.email });
    const contents = await prisma.content.findMany({ 
      where: { userId: user.userId }, 
      orderBy: { createdAt: 'desc' } 
    });
    return NextResponse.json(contents);
  } catch (e) {
    console.error("Error in GET /api/content", e);
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthedUser();
    const body = await req.json();
    console.log("POST /api/content", { userId: user.userId, title: body.title });
    const content = await prisma.content.create({
      data: {
        userId: user.userId,
        type: body.type || 'article',
        title: body.title,
        body: body.body,
      }
    });
    return NextResponse.json(content);
  } catch (e) {
    console.error("Error in POST /api/content", e);
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}
