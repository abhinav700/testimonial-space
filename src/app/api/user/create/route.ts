import { prisma } from "@/prisma/client";
import { redisClient, redisManager } from "@redis/redis";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UserDataSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string(),
});

export async function POST(req: NextRequest, response: NextResponse) {
  try {
    const { email, name } = UserDataSchema.parse(await req.json());
    const redisKey = `user:${JSON.stringify({ email, name })}`;

    const cachedData: string | null = await redisClient.get(redisKey);

    let user;

    /**
     * if data is not cached, we check in the database
     */
    if (cachedData != null) {
      user = await JSON.parse(cachedData);
    } else {
      user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      await redisClient.setex(redisKey, 2 * 3600, JSON.stringify(user));
    }

    if (user)
      return NextResponse.json({
        msg: "user already exists",
        user,
        status: 403,
      });

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal server error", status: 400 });
  }
}
