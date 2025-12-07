import TweetModel from "@/lib/models/TweetModel";
import LikeModel from "@/lib/models/LikeModel";
import mongoose from "mongoose";
import connectDb from "@/lib/config/database";

export async function getUserLikedTweets(userId) {
    try {
        await connectDb();

        const likes = await LikeModel.find({ userId: new mongoose.Types.ObjectId(userId) });

        const tweetIds = likes.map((l) => l.tweetId);

        const tweets = await TweetModel.aggregate([
            { $match: 
                { _id: { $in: tweetIds } } 
            },
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