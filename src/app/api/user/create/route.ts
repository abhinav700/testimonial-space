import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import {z} from "zod";

const UserDataSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string(),
})

export async function POST(req: NextRequest, response:NextResponse){
  try {
    const prisma =  new PrismaClient();
    const {email, name}=  UserDataSchema.parse((await req.json()))
    
    const user = await prisma.user.findFirst({
      where:{
        email
      }
    })  
    
    if(user)
      return NextResponse.json({msg:"user already exists", user, status:403});

    const newUser = await prisma.user.create({
      data:{
        email,
        name
      }
    })
    
    return NextResponse.json({user: newUser})
  } catch (error) {
    console.log(error)
  }
}