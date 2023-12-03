import { getAuthSession } from "@/utills/auth";
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
                user:true,
                _count: {
                  select: { comments: true },
                },
              },
           
        })
        return new NextResponse(JSON.stringify(post,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wring"},{status:500}));
    }
}

// update post 
export const PATCH =async(req,{params})=>{
    const {id} = params;
    const session = await getAuthSession()
    const body= await req.json()
    try {
        if(!session){
            return new NextResponse(JSON.stringify({messege:"You are not loged in"},{status:501}))
        }
        const post = await prisma.Post.findUnique({
            where:{
                id
            }
        })

        if(session?.user.id !== post.userId){
            return new NextResponse(JSON.stringify({messege:"You are not Owner of this post"},{status:501}))
        }
        const updatedPost = await prisma.Post.update({
            where:{
                id,
            },
            data:body,
        })
        return new NextResponse(JSON.stringify(updatedPost,{status:"201"}))
    } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({messege:"You are not Owner of this post"},{status:"500"}))
}
}

// remove post 
export const DELETE = async(req,{params})=>{
    const {id} = params;
    const session = await getAuthSession();
    try {
        if(!session){
            return new NextResponse(JSON.stringify({messege:"You are not loged in"},{status:501}))
        }
        const post = await prisma.Post.findUnique({
            where:{
                id
            }
        })

        if(session?.user.id !== post.userId){
            return new NextResponse(JSON.stringify({messege:"You are not Owner of this post"},{status:501}))
        }
        await prisma.Post.delete({
            where:{
                id
            },
        })
        return new NextResponse(JSON.stringify({messege:"Delete Successfull"},{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:501}))
    }
}