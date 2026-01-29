export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuthedUser } from "../../../lib/authServer";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuthedUser(req);
    console.log("GET /api/content", { userId: user.userId, email: user.email });
    const contents = await prisma.content.findMany({ where: { userId: user.userId }, orderBy: { createdAt: desc } });
    return NextResponse.json(contents);
  } catch (e) {
    console.error("Error in GET /api/content", e);
    return NextResponse.json({ error: Not
