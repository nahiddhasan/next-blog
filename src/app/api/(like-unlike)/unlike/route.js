import { getAuthSession } from "@/utills/auth";
import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const DELETE =async(req)=>{
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId")
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

            const liked = await prisma.Like.findFirst({
                where:{
                    userId:user.id,
                    postId,
                }
            })

            if(!liked){
                return new NextResponse(JSON.stringify({messege:"You didn't liked yet"},{status:400}))
            }

           await prisma.Like.delete({
            where:{
                id:liked.id,
            }
        })
            
            return new NextResponse(JSON.stringify({messege:"unLiked"},{status:200}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))

        }
    }
}

