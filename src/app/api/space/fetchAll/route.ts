import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const emailSchema = z.string().email("invalid email")

export async function GET(req: NextRequest){
  try {
    // To do : Replace with user id
    const email = emailSchema.parse(req.nextUrl.searchParams.get("email"));
    
    const spaces = await prisma.space.findMany({
      where:{
        ownerEmail: email
      },
      include: {
        testimonials: true,
      }
    });

    return NextResponse.json({spaces, status : 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}