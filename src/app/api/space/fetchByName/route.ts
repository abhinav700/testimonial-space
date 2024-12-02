import { prisma } from "@/prisma/client";
import { redisClient } from "@redis/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const spaceName: string = req.nextUrl.searchParams.get("spaceName")!;

    /**
     * storing the data related to a space
     */
    const redisKey: string = `space[name]:${spaceName}`;
    const cachedData = await redisClient.get(redisKey);

    let space;

    if (cachedData != null) {
      space = await JSON.parse(cachedData);
    } else {
      space = await prisma.space.findFirst({
        where: {
          spaceName,
        },
        include: {
          testimonials: true,
        },
      });
      await redisClient.setex(redisKey, 2 * 3600, JSON.stringify(space));
    }
    if (!space)
      return NextResponse.json({ msg: "Space does not exist", status: 401 });

    return NextResponse.json({ status: 200, msg: "success", space });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 401, msg: "Internal server error" });
  }
}
