import { getAuthSession } from "@/utills/auth";
import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const POST =async(req)=>{
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

            if(liked){
                return new NextResponse(JSON.stringify({messege:"Alredy liked"},{status:404}))
            }
           await prisma.Like.create({
                data:{
                    postId,
                    userId:user.id
                }
            })
            return new NextResponse(JSON.stringify({messege:"liked"},{status:200}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))

        }
    }
}

export const GET = async(req)=>{
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
  
    const session = await getAuthSession();
    try {

        if(session?.user){
       
            const likes = await prisma.Like.count({
                where:{
                    postId:postId,
                }
            })
    
            const isLiked = await  prisma.Like.findFirst({
                    where:{
                        userId:session?.user.id,
                        postId:postId,
                    }
                })

            return new NextResponse(JSON.stringify({likes,isLiked},{status:200}))
        }
            const likes = await prisma.Like.count({
                where:{
                    postId:postId,
                }
            })
        return new NextResponse(JSON.stringify(likes,{status:200}))
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))
    }
}

