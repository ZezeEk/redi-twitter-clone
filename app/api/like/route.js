import LikeModel from "@/lib/models/LikeModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const { default: connectDb } = require("@/lib/config/database")

const loadDb = async () => {
    await connectDb();
}
loadDb();

export async function POST(request) {
    try {
        const data = await request.json();
        const tweetId = new mongoose.Types.ObjectId(data.tweetId);
        const userId = new mongoose.Types.ObjectId(data.userId);

        const isExisting = await LikeModel.findOne({ tweetId, userId }).lean();

        if (isExisting) {
            await LikeModel.deleteOne({ tweetId, userId });

            return NextResponse.json({
                success: true,
                liked: false,
                message: "Like removed"
            });
        }

        await LikeModel.create({ tweetId, userId });

        return NextResponse.json({
            success: true,
            liked: true,
            message: "Like added successfully"
        });
    }
    catch (error) {
        console.log("route.js Error: ", error);
        return NextResponse.json(
            { message: "Error storing: ", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        //const likes = await LikeModel.find().sort({ createdDate: -1 });
        const { searchParams } = new URL(request.url);
        const tweetId = searchParams.get("tweetId");
        
        const countLikes = await LikeModel.countDocuments({ tweetId });

        return NextResponse.json({ success: true, countLikes });

    }
    catch (error) {
        return NextResponse.json({ message: "Error get function", error: error.message }, { status: 500 });
    }
}