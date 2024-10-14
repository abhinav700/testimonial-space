import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  // Todo : Replace with singleton pattern.
  try {
    const prisma = new PrismaClient()
    const email = req.nextUrl.searchParams.get('email');
    const spaceId = req.nextUrl.searchParams.get("spaceId");

    const user = await prisma.user.findFirst({
      where:{
          email
      }
    });
y

    const testimonials = await prisma.testimonials.findMany({
      spaceId
    })

    return NextResponse.json({testimonials, status: 200})

  } catch (error) {
    console.log(error);
    NextResponse.json({msg: error, status: 500})
  }
}