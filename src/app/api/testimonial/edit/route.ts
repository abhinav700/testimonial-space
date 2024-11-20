import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest){
  const prisma = new PrismaClient();
  try {
    const {id, createdAt, customerName, description} = await req.json();
    const oldTestimonial = await prisma.testimonial.findFirst({
      where:{
        id
      }
    });
    
    if(!oldTestimonial)
      return NextResponse.json({status: 401, msg: "Testimonial does not exist"});
    
    const newTestimonial = await prisma.testimonial.update({
      where:{
        id
      },
      data:{
        ...oldTestimonial,
        createdAt,
        customerName,
        description
      }
    })

    return NextResponse.json({status: 200, msg: "Operation successful", testimonial: newTestimonial});
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 500, msg: "Internal server error"});
  }
}