import {getUserTweets} from "@/services/getUserTweets";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        
        const tweets = await getUserTweets(userId);

        return NextResponse.json({ success: true, tweets });

    }
    catch (error) {
        return NextResponse.json({ message: "Error get function", error: error.message }, { status: 500 });
    }
}