"use client";
import { X } from "lucide-react";
import { useState } from "react";

export default function CommentModal({ tweet, user, onClose, onCommentAdded }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const userId = user?._id;

    const response = await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tweetId: tweet._id,
        userId,
        comment
      })
    });

    const data = await response.json();
    setLoading(false);
    if (data.success){
        onClose();
        onCommentAdded();
    } 
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-20 z-50">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl p-4 relative">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <div className="flex gap-3 mb-4">
          <img src={tweet?.user?.image} className="w-10 h-10 rounded-full" />

          <div className="bg-gray-100 p-3 rounded-lg w-full">
            <p className="font-semibold text-sm">{tweet.user.name}</p>
            <p className="text-gray-700 text-sm">{tweet.body}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <img
            src={user?.image}
            className="w-10 h-10 rounded-full"
          />
          <textarea
            placeholder="Write your reply..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border-b border-gray-300 focus:outline-none resize-none p-2"
            rows="3"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            disabled={loading || comment.trim().length === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
