import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    /**
     * fetching the testimonial corresponding to the testimonial Id
     */
      let testimonial = await prisma.testimonial.findFirst({
        where: {
          id: id as string,
        },
      });
    if (!testimonial)
      return NextResponse.json({
        status: 401,
        msg: "Testimonial does not exist",
      });

    return NextResponse.json({
      status: 200,
      msg: "operation successful",
      testimonial,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, msg: "Internal server error" });
  }
}
