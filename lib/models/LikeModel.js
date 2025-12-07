import mongoose from "mongoose";

const { Schema } = mongoose

const likeSchema = new Schema({
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
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

likeSchema.index({ tweetId: 1, userId: 1 }, { unique: true });

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default Like;
