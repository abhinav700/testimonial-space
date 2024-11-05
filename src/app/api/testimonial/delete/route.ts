import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
export async function DELETE(req: NextRequest){
  try {
    const prisma = new PrismaClient();
    const id= req.nextUrl.searchParams.get("id");
    const testimonial = await prisma.testimonial.findFirst({
      where:{
        id : id as string,
      }
    })

    if(!testimonial){
      return NextResponse.json({status: 500, msg: "Testimonial does not exist"});
    }

    const res = await prisma.testimonial.delete({
      where:{
        id: id as string,
      }
    })

    return NextResponse.json({status: 200, msg: "Operation successful"});
  } catch (error) {
    return NextResponse.json({status: 500, msg: "Operation failed due to internal Server Error"})

  }
}