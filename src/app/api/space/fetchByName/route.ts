import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  try {
    const prisma =  new PrismaClient();
    const spaceName:string = req.nextUrl.searchParams.get("spaceName")!;
    const space = await prisma.space.findFirst({
      where:{
        spaceName
      },
      include:{
        testimonials: true
      }
    });
    if(!space)
      return NextResponse.json({msg:"Space does not exist", status:401});
  
    return NextResponse.json({status: 200, msg: "success", space});
  } catch (error) {
    console.log(error);
    return NextResponse.json({status:401, msg: "Internal server error"});
  }
}