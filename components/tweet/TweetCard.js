"use client";
import { MessageCircle, Heart, Repeat, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import CommentModal from "../CommentModal";
import { useRouter } from "next/navigation";

export default function TweetCard({ tweet, user }) {

  const [like, setLike] = useState(tweet?.likeCount);
  const [error, setError] = useState(null);
  const [heart, setHeart] = useState(tweet?.isLiked);
  const [openComment, setOpenComment] = useState(false);
  const [commentCount, setCommentCount] = useState(tweet?.commentCount);
  const router = useRouter();

  const handleLike = async () => {

    const response = await fetch("/api/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweetId: tweet._id, userId: user?._id })
    });

    const data = await response.json();

    if (data.success) {
      if (data.liked) {
        setLike(prev => prev + 1);
        setHeart(true);
      }
      else{
        setLike(prev => prev - 1);
        setHeart(false);
      }
    }
    else
      setError(data.message || "Number of likes can not be shown");
  }

  if (!tweet?.user) return <div className="p-4 text-gray-500">Loading tweet...</div>;

  const avatar = tweet?.user?.image;
  const verified = tweet?.user?.id % 2 === 0;

  return (
    <div className="border-b border-gray-300 p-4 cursor-pointer bg-white">
      <div className="flex items-start gap-3">
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />

        <div className="flex-1">
          <div className="flex items-center gap-1 text-sm text-gray-900 font-semibold">
            {`${tweet?.user?.name}`}
            {verified && <span className="text-blue-500">✔︎</span>}
          </div>

          <div className="text-gray-600 text-xs mt-0.5">
            @{tweet?.user?.name}
          </div>

          <p
            className="text-gray-900 mt-2 text-[15px] cursor-pointer"
            onClick={() => {
              sessionStorage.setItem("selectedTweet", JSON.stringify(tweet));
              router.push(`/main/tweet/${tweet._id}`);
            }}
          >
            {tweet.body}
          </p>

          {tweet.image && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-300">
              <img src={tweet.image} alt="tweet" className="w-full" />
            </div>
          )}

          <div className="flex justify-start mt-3 max-w-md text-gray-600 gap-6">
            <div className="flex items-center gap-2 hover:text-blue-500 transition">
              <MessageCircle size={18} onClick={(e) => {
                e.stopPropagation();
                setOpenComment(true);
              }} />
              <span className="text-xs">{commentCount}</span>
            </div>

            <div className="flex items-center gap-2 hover:text-green-500 transition">
              <Repeat size={18} />
              <span className="text-xs">127</span>
            </div>
            <button onClick={handleLike} className={`flex items-center gap-2 hover:text-red-500 ${heart ? "text-red-500" : "text-gray-600 hover:text-red-500"} transition`}>
              <Heart size={18} />
              <span className="text-xs">{like ?? 0}</span>
            </button>

            <button className="flex items-center gap-2 hover:text-blue-500 transition">
              <BarChart3 size={18} />
              <span className="text-xs">{tweet.views ?? 0}</span>
            </button>
          </div>
        </div>
      </div>
      {openComment && (
        <CommentModal
          tweet={tweet}
          user={user}
          onClose={() => setOpenComment(false)}
          onCommentAdded={() => setCommentCount(prev => prev + 1)}
        />
      )}
    </div>
  );
}