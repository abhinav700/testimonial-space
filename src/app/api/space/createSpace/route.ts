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

export async function POST(req: NextRequest, res: NextResponse){
  const prisma = new PrismaClient();
  try {
    const {ownerEmail, spaceName, headerTitle, customMessage, questions} = SpaceSchema.parse(await req.json())
    
    const newSpace = await prisma.space.create({
      data: {
        ownerEmail,
        spaceName,
        headerTitle,
        customMessage,
        questions
      }
    })

    return NextResponse.json(newSpace)
  } catch (error) {
    console.log(error)
  }
}