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
            // const post = await prisma.Post.findUnique({
            //     where:{
            //         id:postId
            //     }
            // })

            // if(!post){
            //     return new NextResponse(JSON.stringify({messege:"Post not Found"},{status:404}))
            // }
            const user = await prisma.Post.findUnique({
                where:{
                    email:session.user.email
                }
            })

            if(!user){
                return new NextResponse(JSON.stringify({messege:"User not Found"},{status:404}))
            }
            const like = await prisma.Like.create({
                data:{
                    postId,
                    userId:user.id
                }
            })
            return new NextResponse(JSON.stringify(like,{status:200}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))

        }
    }
}

export const GET = async(req)=>{
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId")
    try {
        const likes = await prisma.Like.findMany({
            where:{
                postId,
            }
        })
        return new NextResponse(JSON.stringify(likes,{status:500}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))
    }
}