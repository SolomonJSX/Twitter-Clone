import {NextRequest, NextResponse} from "next/server";
import serverAuth from "@/libs/serverAuth";

export async function GET(req: NextRequest) {
    try {
        const { currentUser } = await serverAuth(req)

        return NextResponse.json(currentUser, {
            status: 200
        })
    } catch (e) {
        return NextResponse.json(null, {
            status: 400
        })
    }
}