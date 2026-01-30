export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuthedUser } from "@/lib/authServer";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuthedUser(req);
    const profile = await prisma.userProfile.findUnique({ where: { userId: user.userId } });
    const upserted = profile ?? await prisma.userProfile.create({ data: { userId: user.userId, email: user.email } });
    console.log("GET /api/me", { userId: user.userId, email: user.email });
    return NextResponse.json({ user, profile: upserted ?? profile });
  } catch (e) {
    console.error("Error in GET /api/me", e);
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}
