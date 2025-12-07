
'use client'

import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import TweetCard from "@/components/tweet/TweetCard";

export default function TweetDetail() {
  const [tweet, setTweet] = useState(null);
  const [comments, setComments] = useState(null);

  const avatar = tweet?.user?.image
  const verified = tweet?.user?.id % 2 === 0;

  useEffect(() => {
    const stored = sessionStorage.getItem("selectedTweet");

    if (stored) {
      const tweetData = JSON.parse(stored);
      setTweet(tweetData);

      const fetchComments = async () => {
        try {
          const res = await fetch(`/api/comment?tweetId=${tweetData?._id}`);
          const data = await res.json();

          if (data.success) setComments(data.comments);

        } catch (err) {
          console.error("Failed to fetch comments", err);
        }
      };

      fetchComments();
    }
  }, []);


  return (
    <main className="min-h-[80vh] flex justify-center items-start p-6 bg-gray-100">
      <div className="bg-white rounded-xl border border-gray-300 shadow-md max-w-xl w-full p-6 flex flex-col gap-6">

        <Link
          href={`/main`}
          className="inline-block mt-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition"
        >
          ← Post
        </Link>

        <div className="flex items-center gap-3">
          <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-gray-900 font-semibold">
              {`${tweet?.user?.name}`}
              {verified && <span className="text-blue-500">✔︎</span>}
            </div>
            <div className="text-gray-600 text-sm">@{tweet?.user?.name}</div>
          </div>
        </div>

        <div>
          {/* <h1 className="text-2xl font-bold text-gray-900">{tweet.title}</h1> */}
          <p className="text-gray-800 mt-2 text-base leading-relaxed">{tweet?.body}</p>

          {tweet?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tweet?.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 text-gray-600 mt-4">
          <div className="flex items-center gap-1">
            <Heart size={18} />
            <span className="text-sm">{tweet?.likeCount ?? 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={18} />
            <span className="text-sm">{tweet?.commentCount}</span>
          </div>
          <div className="text-sm">Views: {tweet?.views ?? 0}</div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">
            Comments ({comments?.length})
          </h2>
          <div className="flex flex-col gap-3">
            {comments?.map((c) => {
              const tweetCard = {
                _id: c._id,
                body: c.body,
                user: c.userId,
                likeCount: c.likeCount ?? 0,
                views: 0,
                tags: ['american', 'love', 'fiction'],
                createdAt: c.createdAt,
              };
              return <TweetCard key={c?._id} tweet={tweetCard} user={c?.userId} />
            })}
          </div>
        </div>
      </div>
    </main >
  );
}