"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import TweetCard from "../tweet/TweetCard";

export default function ProfilePage({ user: loginUser }) {
    const tabs = ["Posts", "Likes"];
    const [active, setActive] = useState("Posts");
    const [user, setUser] = useState(loginUser);
    const [error, setError] = useState(null);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setTweets([]);
                const userId = loginUser._id;
                let response = "";
                if (active === "Posts") {
                    response = await fetch(`/api/userTweets?userId=${userId}`);

                }
                else {
                    response = await fetch(`/api/likedTweets?userId=${userId}`);
                }

                const tweets = await response.json();

                if (tweets.success) {
                    setTweets(tweets.tweets);
                }
            }
            catch (error) {
                setError('Error: ', error);
            }
        }
        fetchUser();
    }, [active, loginUser?._id]);

    return (
        <div>
            <div className="h-40 bg-gray-300 w-full"></div>
            <div className="px-4 pb-3">
                <div className="flex justify-between items-center">
                    <img
                        src={loginUser?.image}
                        className="w-32 h-32 rounded-full border-4 border-white -mt-16"
                    />

                    <button className="border px-4 py-1 rounded-full font-semibold hover:bg-gray-100">
                        Set up profile
                    </button>
                </div>

                <div className="mt-2">
                    <div className="text-xl font-bold">{loginUser?.name}</div>
                    <div className="text-gray-600">@{loginUser?.name.replace(/\s+/g, "")}</div>
                </div>

                <div className="text-gray-600 mt-2 text-sm">
                    {user?.createdAt
                        ? `Joined ${new Date(loginUser.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}`
                        : "Joined ..."}
                </div>

                <div className="flex gap-4 mt-2 text-sm">
                    <span><b>1</b> Following</span>
                    <span><b>0</b> Followers</span>
                </div>
            </div>

            <div className="flex border-b border-gray-300">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={`flex-1 text-center py-3 font-semibold ${active === tab
                            ? "text-black border-b-2 border-blue-500"
                            : "text-gray-500 hover:bg-gray-100"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="p-4 text-gray-600 text-sm">
                {active === "Posts" && <div>
                    <div>
                        {tweets && tweets.length > 0 && loginUser ? (
                            tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} user={tweet?.user} />)
                        ) : (
                            <div>No posts yet</div>
                        )}
                    </div>
                </div>}
                {active === "Likes" && <div>
                    {tweets && tweets.length > 0 && loginUser ? (
                        tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} user={tweet?.userId} />)
                    ) : (
                        <div>No liked posts</div>
                    )}
                </div>}
            </div>
        </div>
    );
}
