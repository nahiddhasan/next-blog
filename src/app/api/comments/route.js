import { getAuthSession } from "@/utills/auth";
import { NextResponse } from "next/server";

export const GET =async (req)=>{
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId")
    try {
        const comments = await prisma.Comment.findMany({
            where:{
                ...(postId && { postId }),
            },
            include:{
                user:true,
            },
            orderBy: {
                createdAt: 'desc'
            }
            
        })
        return new NextResponse(JSON.stringify(comments,{status:200}))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:501}))
        
    }
}

export const POST =async(req)=>{

    const session = await getAuthSession()
    const body = await req.json();

    if (!session){
        return new NextResponse({messege:"Unauthenticated"}, { status: 403})
    }else{
        try {
            const comment = await prisma.Comment.create({
                data:{...body,userEmail:session.user.email},
            })
            return new NextResponse(JSON.stringify(comment,{status:200}))
        } catch (error) {
            console.log(error)
            return new NextResponse(JSON.stringify({messege:"Something went wrong"},{status:500}))

        }
    }
}
