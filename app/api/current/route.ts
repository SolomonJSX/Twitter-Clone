import {NextRequest, NextResponse} from "next/server";
import serverAuth from "@/libs/serverAuth";

export default async function GET(req: NextRequest) {
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