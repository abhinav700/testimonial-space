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
    const space = await prisma.space.findFirst({
      where:{
        id: spaceId
      }
    });

    if(!space)
      NextResponse.json({msg:"space does not exist", status: 404});

    
    const newTestimonial = await prisma.testimonial.create({
      data:{
        description,
        customerName,
        customerEmail,
        spaceId     
      }
    })

    return NextResponse.json({testimonial: newTestimonial, status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({status:"500"})
  }
}