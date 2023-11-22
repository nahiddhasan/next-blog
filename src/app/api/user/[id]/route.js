import { getAuthSession } from "@/utills/auth";
import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const GET =async(req,{params})=>{
    const {id} = params;
    const {searchParams} = new URL(req.url)
    const page = searchParams.get("page")
    const limit = searchParams.get("limit")

    try {
        const user = await prisma.User.findUnique({
            where:{
                id:id
            },
            include:{
                _count: {
                    select: { posts: true },
                  },
                posts:{
                    take:parseInt(limit),
                    skip: limit * (page-1),
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                
            
            },

        })

        return new NextResponse(JSON.stringify(user,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong",status:501}))
    }
}

export const PATCH = async(req,{params})=>{
    const {id} = params;

    const session = await getAuthSession();
    const body =await req.json();
    try {
        const user = await prisma.User.findUnique({
            where:{
                id,
            },
        })

        if(!user){
            return new NextResponse(JSON.stringify({messege:"User not found"},{status:404}))
        }
        if(session.user.email !== user.email){
            return new NextResponse(JSON.stringify({messege:"Not allowed"},{status:401}))
        }
        const updatedUser = await prisma.User.update({
            where:{
                id:user.id,
            },
            data:body,
        })
        return new NextResponse(JSON.stringify(updatedUser,{status:201}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{status:501}))
    }
}