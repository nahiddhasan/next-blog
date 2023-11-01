import prisma from "@/utills/connect";
import { NextResponse } from "next/server";
export const GET =async(req,{params})=>{
    const {id} = params;
    try {
        const post = await prisma.Post.update({
            where:{
                id:id,
            },
            data: { views: { increment: 1 } },
            include: {
                user: true,
                comments: true
            },
           
        })
        return new NextResponse(JSON.stringify(post,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wring"},{status:200}));
    }
}