import { getAuthSession } from "@/utills/auth";
import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const POST =async(req)=>{
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

            if(followed){
                return new NextResponse(JSON.stringify({messege:"Alredy followed"},{status:401}))
            }
           await prisma.Follow.create({
                data:{
                    followingId,
                    followerId:session.user.id,
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
    const followingId = searchParams.get("followingId");
    const session = await getAuthSession();
    try {
       if(session?.user){

        const isFollowing = await prisma.Follow.findFirst({
            where:{
                followerId:session.user.id,
            }
        })

        const followings = await prisma.Follow.count({
            where:{
                followingId,
            }
        })
        return new NextResponse(JSON.stringify({followings,isFollowing},{status:200}))
       }

        const followings = await prisma.Follow.count({
            where:{
                followingId,
            }
        })

        return new NextResponse(JSON.stringify({followings},{status:200}))
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))
    }
}

