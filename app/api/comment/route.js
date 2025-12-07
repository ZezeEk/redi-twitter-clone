import CommentModel from "@/lib/models/CommentModel";
import TweetModel from "@/lib/models/TweetModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const { default: connectDb } = require("@/lib/config/database")

const loadDb = async () => {
    await connectDb();
}
loadDb();

export async function POST(request) {
    try {
        const { tweetId, userId, comment } = await request.json();

        if (!tweetId || !userId || !comment) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const newComment = await CommentModel.create({
            tweetId: new mongoose.Types.ObjectId(tweetId),
            userId: new mongoose.Types.ObjectId(userId),
            body: comment
        });

        await TweetModel.findByIdAndUpdate(tweetId, { $inc: { commentCount: 1 } }).lean();

        return NextResponse.json({
            success: true,
            message: "Comment added successfully",
            comment: newComment
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
        const { searchParams } = new URL(request.url);
        const tweetId = searchParams.get("tweetId");

        const id = new mongoose.Types.ObjectId(tweetId);

        const comments = await CommentModel.find({ tweetId: id })
            .populate("userId", "name image")
            .sort({ createdAt: -1 })
            .lean();

        const count = comments.length;

        return NextResponse.json({
            success: true,
            count,
            comments
        });

    }
    catch (error) {
        return NextResponse.json({ message: "Error get function", error: error.message }, { status: 500 });
    }
}