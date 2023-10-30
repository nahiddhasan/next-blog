import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";


export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
        
    ],
 
    pages: {
      signIn: "/login",
      error:"/login"
    },
    
  };

export const getAuthSession = () => getServerSession(authOptions);