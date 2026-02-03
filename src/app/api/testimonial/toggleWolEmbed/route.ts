import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest, res:NextResponse){
  try{
    const {id} = await req.json();
    if(!id){
      return NextResponse.json({status: 401, msg: "Missing Id"});
    }

    const oldTestimonial = await prisma.testimonial.findFirst({
      where:{
          id
      }
    }) 
    
    if(!oldTestimonial){
      return NextResponse.json({status: 401, msg: "Invalid id"});
    }

    await prisma.testimonial.update({
      where:{
        id,
      },data:{
        ...oldTestimonial,
        isWallOfLoveEmbed: !oldTestimonial.isWallOfLoveEmbed
      }
    })
    
    return NextResponse.json({status: 200, msg:"Updated successfully"})
  }catch (e){
    console.log(e);
  }
}