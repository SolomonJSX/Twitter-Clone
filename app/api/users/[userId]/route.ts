import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string }}) {
    try {
        const userId = params.userId

        if (!userId || typeof userId !== "string")
            return NextResponse.json("Invalid ID", { status: 400 })

        const existingUser = await prisma.user
            .findUnique({
                where: {
                    id: parseInt(userId)
                }
            });

        const followersCount = await prisma.follow
            .count({
                where: {
                    userId: parseInt(userId)
                }
            });

        return NextResponse.json({
            followersCount,
            ...existingUser
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, {
            status: 400
        })
    }
}