import { getToken } from "next-auth/jwt";
import prisma from "@/libs/prismadb";
import {NextRequest} from "next/server";

const serverAuth = async (req: NextRequest) => {
    const secret = process.env.NEXTAUTH_SECRET

    const token = await getToken({
        req,
        secret
    })

    if (!token?.email) throw new Error("Not signed in")

    const currentUser = await prisma.user.findUnique({where: {email: token.email}, include: {
        followers: true,
            followings: true
        }})

    if (!currentUser) throw new Error("Not signed in")

    return {currentUser}
}

export default serverAuth;