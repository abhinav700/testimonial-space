import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const SpaceSchema = z.object({
  ownerEmail: z.string().email("invalid email"),
  spaceName: z.string(),
  headerTitle: z.string(),
  customMessage: z.string(),
  questions: z.array((z.string())).max(5, "only upto 5  questions are allowed")
});

export async function POST(req: NextRequest){
  try {
    const prisma = new PrismaClient();
    const data =  SpaceSchema.parse(await req.json())
    const {ownerEmail, headerTitle, customMessage, questions, spaceName} = data; 
    
    const user = await prisma.user.findFirst({
      where:{
          email: ownerEmail
      }
    });

    if(!user)
      return NextResponse.json({msg:"owner does not exist", status: 404});

    const space = await prisma.space.findFirst({
      where:{
        spaceName
      }
    });

    if(space)
      return NextResponse.json({msg:"space name should be unique", status: 404});

    // Implement function to make sure that user only sends unique space name on the frontend.
    // first implement the naive method by checking datbase for every call then productionize it
    // using reddis
    const newSpace = await prisma.space.create({
      data: {
        ownerEmail,
        spaceName,
        headerTitle,
        customMessage,
        questions
      }
    })

    return NextResponse.json({space: newSpace, status: 200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: "Internal Server Error", status: 500 })
  }
}