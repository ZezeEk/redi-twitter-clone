import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";

async function getTweet(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`, { next: { revalidate: 10 } });
  const data = await res.json();
  return data;
}

async function getUser(id) {
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  const data = await res.json();
  return data;
}

export default async function TweetDetail({ params }) {
  const tweet = await getTweet(params.id);
  const user = await getUser(tweet.userId);

  const avatar = user?.image 
  const verified = user?.id % 2 === 0;

  return (
    <main className="min-h-[80vh] flex justify-center items-start p-6 bg-gray-100">
      {/* Card Container */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-md max-w-xl w-full p-6 flex flex-col gap-6">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-gray-900 font-semibold">
              {`${user?.firstName} ${user?.lastName}`}
              {verified && <span className="text-blue-500">✔︎</span>}
            </div>
            <div className="text-gray-600 text-sm">@{user?.username}</div>
          </div>
        </div>

        {/* Tweet Content */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{tweet.title}</h1>
          <p className="text-gray-800 mt-2 text-base leading-relaxed">{tweet.body}</p>

          {/* Tags */}
          {tweet.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tweet.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Tweet Image */}
          {tweet.image && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-300">
              <img src={tweet.image} alt="tweet" className="w-full" />
            </div>
          )}
        </div>

        {/* Reactions */}
        <div className="flex items-center gap-6 text-gray-600 mt-4">
          <div className="flex items-center gap-1">
            <Heart size={18} />
            <span className="text-sm">{tweet.reactions?.likes ?? 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={18} />
            <span className="text-sm">{tweet.reactions?.dislikes ?? 0}</span>
          </div>
          <div className="text-sm">Views: {tweet.views ?? 0}</div>
        </div>

        {/* Back Link */}
       <Link
            href="/"
            className="inline-block mt-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition"
            >
            ← Back to Feed
        </Link>
      </div>
    </main>
  );
}