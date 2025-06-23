import {NextRequest, NextResponse} from "next/server";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextRequest) {
    if (req.method !== "GET") return NextResponse.json(null, {
        status: 405
    })

    try {
        const { currentUser } = await serverAuth()

        return NextResponse.json(currentUser, {
            status: 200
        })
    } catch (e) {
        console.error(e)
        return NextResponse.json(null, {
            status: 400
        })
    }
}