import { prisma } from "@/prisma/client";
import { redisClient } from "@redis/redis";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const EmailSchema = z.string().email("invalid email");
const SpaceIdSchema = z.string();

export async function GET(req: NextRequest) {
  // Todo : Replace with singleton pattern.
  try {
    const email = EmailSchema.parse(req.nextUrl.searchParams.get("email"));
    const spaceId = SpaceIdSchema.parse(
      req.nextUrl.searchParams.get("spaceId")
    );

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) NextResponse.json({ msg: "owner does not exist", status: 404 });

    const space = await prisma.space.findFirst({
      where: {
        id: spaceId,
        ownerEmail: email,
      },
    });

    if (!space) NextResponse.json({ msg: "space does not exist", status: 404 });

    let testimonials = await prisma.testimonial.findMany({
        where: {
          spaceId,
        },
      });

    return NextResponse.json({ testimonials, status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ msg: error, status: 500 });
  }
}
