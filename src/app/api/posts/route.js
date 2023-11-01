import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const GET=async(req)=>{

    const {searchParams} = new URL(req.url)
    const cat = searchParams.get("cat")
    const userId = searchParams.get("userId")
    const search = searchParams.get("search")
    const filters = {
        ...(cat && { catSlug:cat}),
        ...(userId && { userId:userId}),
        ...(search && { title: {contains: search,mode:"insensitive"} }),
      };

    try {

        if(filters){
            const posts = await prisma.Post.findMany({
                where:filters,
                include: {
                    user: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return new NextResponse(JSON.stringify(posts,{status:200}));
        }else{
            const posts = await prisma.Post.findMany({
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return new NextResponse(JSON.stringify(posts,{status:200}));
        }
        
       
        
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong"}, { status: 200 }));

    }
}