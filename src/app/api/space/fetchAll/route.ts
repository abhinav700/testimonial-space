import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { redisClient } from "@redis/redis";

export const emailSchema = z.string().email("invalid email");

export async function GET(req: NextRequest) {
  try {
    // To do : Replace with user id
    const email = emailSchema.parse(req.nextUrl.searchParams.get("email"));

    /**
     * caching spaces of a email
     */
    const redisKey = `spaces[email]:${email}`;
    const cachedData = await redisClient.get(redisKey);
    let spaces;

    if (cachedData != null) {
      spaces = await JSON.parse(cachedData);
    } else {
      spaces = await prisma.space.findMany({
        where: {
          ownerEmail: email,
        },
        include: {
          testimonials: true,
        },
      });
      await redisClient.setex(redisKey, 2 * 3600, JSON.stringify(spaces));
    }

    return NextResponse.json({ spaces, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
