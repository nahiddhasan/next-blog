import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const GET = async (req,)=>{
    const {searchParams} = new URL(req.url);
const search = searchParams.get("q");
    try {
        const categories = await prisma.Category.findMany({
            where:{
                title: {contains: search,mode:"insensitive"},
            },
            orderBy: {
                title: 'asc'
            }
        })
        return new NextResponse(JSON.stringify(categories,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{status:500}))
    }
}