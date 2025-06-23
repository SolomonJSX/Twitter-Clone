import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

interface IRegisterBody {
    email?: string;
    password?: string;
    name?: string;
    username?: string;
}

export default async function handler(req: NextRequest) {
    if (req.method !== "POST") {
        return NextResponse.json(null, {status: 405})
    }

    try {
        const { email, username, password, name } = await req.json() as IRegisterBody

        const hashedPassword = await bcrypt.hash(password as string, 12)

        const user = await prisma.user.create({
            data: {
                email,
                hashedPassword,
                username,
                name
            }
        })

        return NextResponse.json(user, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null, {
            status: 400
        })
    }
}