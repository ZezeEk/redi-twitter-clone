"use client";
import { MessageCircle, Heart , Repeat} from "lucide-react";
import { useEffect, useState } from "react";

// Random cute avatars
// export const randomAvatars = [
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Eren",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Jin",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Mika",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Nova",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Haru",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Aoi",
//   "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
// ];

// export const getRandomAvatar = () => {
//   return randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
// };

export default function TweetCard({ tweet }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!tweet?.userId) return;

    fetch(`https://dummyjson.com/users/${tweet.userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("User fetch error:", err));
  }, [tweet?.userId]);

  if (!user) return <div className="p-4 text-gray-500">Loading tweet...</div>;

  const avatar = user.image || getRandomAvatar();
  const verified = user.id % 2 === 0;

  return (
    <div className="border-b border-gray-300 p-4 cursor-pointer bg-white">
      <div className="flex items-start gap-3">
        {/* Profile Image */}
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />

        <div className="flex-1">
          {/* Name */}
          <div className="flex items-center gap-1 text-sm text-gray-900 font-semibold">
            {`${user?.firstName} ${user?.lastName}`}
            {verified && <span className="text-blue-500">✔︎</span>}
          </div>

          {/* Username */}
          <div className="text-gray-600 text-xs mt-0.5">
            @{user?.username}
          </div>

          {/* Tweet content */}
          <p className="text-gray-900 mt-2 text-[15px]">{tweet.body}</p>

          {/* Tweet Image */}
          {tweet.image && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-300">
              <img src={tweet.image} alt="tweet" className="w-full" />
            </div>
          )}

          {/* Action Buttons: Like & Dislike */}
          <div className="flex justify-start mt-3 max-w-md text-gray-600 gap-6">
            <div className="flex items-center gap-2 hover:text-blue-500 transition">
              <MessageCircle size={18} />
              <span className="text-xs">10</span>
            </div>

            <div className="flex items-center gap-2 hover:text-green-500 transition">
              <Repeat size={18} />
              <span className="text-xs">127</span>
            </div>
            <button className="flex items-center gap-2 hover:text-red-500 transition">
              <Heart size={18} />
              <span className="text-xs">{tweet.reactions.likes ?? 0}</span>
            </button>

            <button className="flex items-center gap-2 hover:text-blue-500 transition">
              <MessageCircle size={18} />
              <span className="text-xs">{tweet.reactions.dislikes ?? 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}