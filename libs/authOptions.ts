import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credential",
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
                    ...user,
                    id: user.id.toString()
                }
            }
        })
    ],
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt({token, user}) {
            if (user) {
                token.email = user.email
                token.name = user.name
            }
            return token
        },
        session({session, token}) {
            if (token && session.user) {
                session.user.email = token.email
                session.user.name = token.name
            }
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}