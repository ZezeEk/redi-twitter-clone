import mongoose from "mongoose";

const { Schema } = mongoose

const CommentSchema = new Schema({
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
);

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
