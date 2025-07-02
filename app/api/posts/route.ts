import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        const userId = searchParams.get("userId")

        let posts;

        if (userId) {
            const parsedUserId = parseInt(userId)
            posts = await prisma.post.findMany({
                where: {
                    userId: parsedUserId
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        } else {
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        }

        return NextResponse.json(posts, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json(null, {
            status: 400
        })
    }
}

export async function POST(req: NextRequest) {
    try {
        const { currentUser } = await serverAuth(req)
        const body = await req.json();

        const post = await prisma.post.create({
            data: {
                body,
                userId: currentUser.id
            }
        })

        return NextResponse.json(post, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json(null, {
            status: 400
        })
    }
}