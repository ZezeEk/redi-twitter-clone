import mongoose from "mongoose";

const { Schema } = mongoose

const tweetSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
    },
    tags: {
        type: [String]
    },
    views: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    }
);

tweetSchema.index({ userId: 1 });

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export default Tweet;
