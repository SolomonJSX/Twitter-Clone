import {NextRequest, NextResponse} from "next/server";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userId = parseInt(body.userId);
        const {currentUser} = await serverAuth(req)

        if (!userId || !currentUser?.id || currentUser.id === userId) {
            throw new Error("Invalid userId");
        }

        await prisma.follow.create({
            data: {
                followerId: currentUser.id,
                followingId: userId
            }
        })

        return NextResponse.json({message: "Followed successfully"}, {status: 200});
    } catch (e) {
        console.log(e)
        return NextResponse.json(e, {
            status: 401
        })
    }
}

export async function DELETE(req: NextRequest) {
    //При Delete хочу чтобы пользователь удалился
    try {
        const body = await req.json();
        const userId = parseInt(body.userId);
        const {currentUser} = await serverAuth(req)

        if (!userId || !currentUser?.id || currentUser.id === userId) {
            throw new Error("Invalid userId");
        }

        await prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: currentUser.id,
                    followingId: userId
                }
            }
        });

        return NextResponse.json({message: "Successfully deleted."}, {status: 200});
    } catch (e) {
        console.log(e)
        return NextResponse.json(e, {
            status: 401
        })
    }
}