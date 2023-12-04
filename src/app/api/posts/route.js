import { getAuthSession } from "@/utills/auth";
import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const GET=async(req)=>{
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get("userId")
    const cat = searchParams.get("cat")
    const search = searchParams.get("q")
    const page = searchParams.get("page")
    const limit = searchParams.get("limit")

    const filters = {
        ...(cat && { catSlug:cat.toLowerCase()}),
        ...(search && { title: {contains: search,mode:"insensitive"} }),
      };

    try {

        if(userId){
            const userPosts = await prisma.Post.findMany({
                where:{
                    userId
                },
                take:parseInt(limit),
                skip: limit * (page-1),
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return new NextResponse(JSON.stringify(userPosts,{status:200}))

        }

        const [posts,count] = await prisma.$transaction([
            prisma.Post.findMany({
                where:filters,
                take:parseInt(limit),
                skip: limit * (page-1),
                include: {
                    user: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.Post.count({
                where:filters,
            })
        ]) 
         return new NextResponse(JSON.stringify({posts,count},{status:200}))

    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong"}, { status: 500 }));

    }
}

//create a post
export const POST = async (req)=>{
    const session = await getAuthSession();
    const body = await req.json();
    try {
       if(session){
        const post = await prisma.Post.create({
            data:{...body,userId:session.user.id}
        })
        return new NextResponse(JSON.stringify(post,{status:200}))
       }
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{status:500}))
    }
}