import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req :NextRequest){
  const id = req.nextUrl.searchParams.get("id");
  if(!id)
      return NextResponse.json({status: 400, msg: "invalid id"});
  try {
    const prisma = new PrismaClient();
    const space = await prisma.space.findFirst({
      where:{
        id
      }
    })

    if(!space)
      return NextResponse.json({status: 400, msg:"space does not exist"});
    
    const result = await prisma.space.delete({
      where:{
        id
      }
    });

    return NextResponse.json({status:200, msg: "Deletion successful"})
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 400, msg:"Internal server error"})
  }
}