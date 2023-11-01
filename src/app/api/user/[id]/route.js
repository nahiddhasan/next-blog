import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const GET =async(req,{params})=>{
    const {id} = params;
    try {
        const user = await prisma.User.findUnique({
            where:{
                id:id
            },
            include:{
                posts:true,
            }
        })
        return new NextResponse(JSON.stringify(user,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong",status:501}))
    }
}