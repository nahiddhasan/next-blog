import { getAuthSession } from "@/utills/auth";
import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const DELETE =async(req)=>{
    const { searchParams } = new URL(req.url);
    const followingId = searchParams.get("followingId")
    const session = await getAuthSession()

    if (!session){
        return new NextResponse({messege:"Unauthenticated"}, { status: 403})
    }else{
        try {
           
            const user = await prisma.User.findUnique({
                where:{
                    email:session.user.email
                }
            })

            if(!user){
                return new NextResponse(JSON.stringify({messege:"User not Found"},{status:404}))
            }

            const followed = await prisma.Follow.findFirst({
                where:{
                    followerId:session.user.id,
                }
            })
            console.log(followed)
            if(!followed){
                return new NextResponse(JSON.stringify({messege:"You didn't follow yet"},{status:400}))
            }

           await prisma.Follow.delete({
            where:{
                id:followed.id
            }
        })
            
            return new NextResponse(JSON.stringify({messege:"unLiked"},{status:200}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))

        }
    }
}

