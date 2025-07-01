import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";

type UserReqBodyType = {
    name?: string;
    username?: string;
    bio?: string;
    profileImage?: string;
    coverImage?: string;
}

export async function PATCH(req: NextRequest) {
    try {
        const { currentUser } = await serverAuth(req);

        const body = await req.json() as UserReqBodyType;
        const { name, username, bio, profileImage, coverImage } = body;

        if (!name || !username) {
            return NextResponse.json({ error: "Name and username are required" })
        }

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Error updating bio:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}