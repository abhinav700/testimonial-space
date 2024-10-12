import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const TestimonialSchema = z.object({
  description: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  spaceId: z.string()
})

export async function POST(req: NextRequest, res: NextResponse){
  try {
    const prisma = new PrismaClient();
    const {description, customerName, customerEmail, spaceId} = TestimonialSchema.parse(await (req.json()));

    const newTestimonial = await prisma.testimonial.create({
      data:{
        description,
        customerName,
        customerEmail,
        spaceId     
      }
    })

    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.log(error);
  }
}