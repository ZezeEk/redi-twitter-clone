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
        const data = await request.json();
        const title = data.title;
        const body = data.body
        const tags = data.tags;
        const views = data.views;
        const userId = new mongoose.Types.ObjectId(data.userId);
        //const userId = data.userId;

        const tweetData = {
            title, body, tags, views, userId
        };

        await TweetModel.create(tweetData);

        return NextResponse.json({
            success: true,
            message: "Tweet created successfully"
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
        // return NextResponse.json({ message: "GET route çalışıyor" });
        // const tweets = await TweetModel.find().populate("userId", "name image")
        //     .sort({ createdAt: -1 })
        //     .sort({ createdDate: -1 })
        //     .lean();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId"); // giriş yapan kullanıcı

        const tweets = await TweetModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "tweetId",
                    as: "likes"
                }
            },
            {
                $addFields: {
                    likeCount: { $size: "$likes" }
                }
            },

            // Kullanıcı bu tweeti beğenmiş mi?
            {
                $addFields: {
                    isLiked: {
                        $in: [
                            new mongoose.Types.ObjectId(userId),
                            "$likes.userId"
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "tweetId",
                    as: "comments"
                }
            },

            { $addFields: { commentCount: { $size: "$comments" } } },
            { $project: { likes: 0, comments: 0 } },
            { $sort: { createdAt: -1 } }
        ]);
        return NextResponse.json({ success: true, tweets });

    }
    catch (error) {
        return NextResponse.json({ message: "Error get function", error: error.message }, { status: 500 });
    }
}