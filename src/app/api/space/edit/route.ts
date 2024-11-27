import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export  async function PUT(req: NextRequest){
  try {
    const {spaceName, updatedSpaceName, customMessage, header, questions, ownerEmail} = await req.json();
    const space = await prisma.space.findFirst({
      where:{
        spaceName
      }
    });

    if(!space)
        return NextResponse.json({status: 401, msg:"Space does not exist"});

    if(space.ownerEmail != ownerEmail)
        return NextResponse.json({status: 401, msg: "You don't own this space. "});
    
    const data = await prisma.space.update({
      where:{
        spaceName,
      },
      data:{
        spaceName: updatedSpaceName,
        ownerEmail,
        header,
        customMessage,
        questions
      }
    })
    return NextResponse.json({status: 200, msg: "Space updated successfuly", space: data});
  } catch (error) {
    return NextResponse.json({status : 500, msg: 'Internal server error'});
  }
}