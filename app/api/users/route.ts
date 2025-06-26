import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(users, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, {
            status: 400
        })
    }
}