import prisma from "@/utills/connect"
import { NextResponse } from "next/server"

export const GET =async(req)=>{

    try {
        const trandings = await prisma.Post.findMany({
            where:{
                isTranding:true,
            },
            include: {
                user: true,
            },
        })
        
        return new NextResponse(JSON.stringify(trandings,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))
    }
}