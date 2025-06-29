import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string }}) {
    try {
        const { userId } = await params

        if (!userId || typeof userId !== "string")
            return NextResponse.json("Invalid ID", { status: 400 })

        const existingUser = await prisma.user
            .findUnique({
                where: {
                    id: parseInt(userId)
                },
                include: {
                    followers: true,
                    followings: true,
                }
            });

            

        return NextResponse.json(existingUser, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, {
            status: 400
        })
    }
}