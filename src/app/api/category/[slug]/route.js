import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const GET = async(req,{params})=>{
const {slug} = params;
const {searchParams} = new URL(req.url);
const search = searchParams.get("q");
const page = searchParams.get("page");
const limit = searchParams.get("limit");

const filters = {
    ...(slug && { catSlug:slug}),
    ...(search && { title: {contains: search,mode:"insensitive"} }),
  };

    try {
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
                where:{
                    catSlug:slug,
                }
            })
        ])
         return new NextResponse(JSON.stringify({posts,count},{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"something went wrong"},{status:500}))
    }
}