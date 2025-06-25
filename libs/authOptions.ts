import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) throw new Error("Invalid credentials")

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user?.hashedPassword) throw new Error("Invalid credentials")

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!isCorrectPassword) throw new Error("Invalid credentials")

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                }
            }
        })
    ],
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email as string
                token.name = user.name as string
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}