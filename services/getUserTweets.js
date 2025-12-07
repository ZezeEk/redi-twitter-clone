import TweetModel from "@/lib/models/TweetModel";
import mongoose from "mongoose";
import connectDb from "@/lib/config/database";

export async function getUserTweets(userId) {
    try {

        await connectDb();

        const tweets = await TweetModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "users", 
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                },
            },
            { $unwind: "$user" },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "tweetId",
                    as: "likes",
                },
            },
            { $addFields: { likeCount: { $size: "$likes" } } },
            { $project: { likes: 0 } },
            { $sort: { createdAt: -1 } },
        ]);

        return tweets;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}