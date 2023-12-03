import { getAuthSession } from "@/utills/auth";
import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

// update single comment 
export const PATCH = async(req,{params})=>{
    const {id} = params;
    const session = await getAuthSession();
    const body =await req.json();
    try {
        if(!session){
            return new NextResponse(JSON.stringify({messege:"You are not loged in"},{status:401}))
        }
        const comment = await prisma.Comment.findFirst({
            where:{
                id,
            }
        } )

        if(session?.user.email !== comment.userEmail){
            return new NextResponse(JSON.stringify({messege:"You are not Owner of this comment"},{status:401}))
        }

        const updatedComment = await prisma.Comment.update({
            where:{
                id
            },
            data:body,
        })
        return new NextResponse(JSON.stringify(updatedComment,{status:201}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{status:501}))
    }
}

// remove comment 
export const DELETE = async(req,{params})=>{
    const {id} = params;
    const session = await getAuthSession();
    try {
        if(!session){
            return new NextResponse(JSON.stringify({messege:"You are not loged in"},{status:401}))
        }
        const comment = await prisma.Comment.findFirst({
            where:{
                id,
            }
        } )
        if(session?.user.email !== comment.userEmail){
            return new NextResponse(JSON.stringify({messege:"You are not Owner of this comment"},{status:401}))
        }

        await prisma.Comment.delete({
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