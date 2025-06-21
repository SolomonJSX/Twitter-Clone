import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prismadb";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credential",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password"}
            },
            async authorize(credentials) {
                
            }
        })
    ]
})

export {
    handler as GET,
    handler as POST
}