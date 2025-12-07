"use client";
import { useState, useEffect } from "react";
import {
    ImageIcon,
    SmileIcon,
    MapPinIcon
} from "lucide-react";

import {
    GifIcon,
    ChartBarIcon,
    ClockIcon
} from "@heroicons/react/24/outline";

export default function TweetForm({ onAddTweet, user }) {
    const [error, setError] = useState(null);
    const [text, setText] = useState("");
    const [userInfo, setUserInfo] = useState(user);

    // useEffect(() => {
    //     const fetchTweet = async () => {
    //         try {
    //             const response = await fetch(`/api/register?userId=${userId}`, {
    //                 method: "GET",
    //                 headers: { "Content-Type": "application/json" }
    //             });
    //             const data = await response.json();

    //             if (data.success) {
    //                 setUser(data.userById);
    //             }

    //         }
    //         catch (error) {
    //             setError('Error: ', error);
    //         }
    //     }
    //     fetchTweet();
    // }, [userId]);

    const handleSubmit = async () => {
        try {

            const title = text.substring(0, 30);
            const body = text;
            const tags = [
                "american",
                "love",
                "fiction"
            ];
            const views = 3558;
            const userId = userInfo._id;

            const tweetData = {
                title, body, tags, views, userId
            };

            const response = await fetch("/api/tweet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tweetData)
            });

            const data = await response.json();

            if (data.success) {
                setText(""); 
                if (onAddTweet) onAddTweet(); 
            } else {
                setError(data.message || "Tweet could not be added");
            }
        }
        catch (error) {
            setError("error fetching data: " + error.message);
        }
    }


    return (
        <div className="flex mt-6 space-x-2">

            <img
                src={userInfo.image}
                className="w-12 h-12 rounded-full"
            />

            <div className="flex flex-col grow space-y-2">
                <textarea
                    className="w-full resize-none focus:outline-none"
                    placeholder="What's happening?"
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="flex items-center justify-between border-t border-gray-300 pt-2">
                    <div className="flex gap-2 text-blue-500">

                        <button className="hover:bg-blue-100 p-1.5 rounded">
                            <ImageIcon size={20} />
                        </button>

                        <button className="hover:bg-blue-100 p-1.5 rounded">
                            <GifIcon className="h-5 w-5" />
                        </button>

                        <button className="hover:bg-blue-100 p-1.5 rounded">
                            <ChartBarIcon className="h-5 w-5" />
                        </button>

                        <button className="hover:bg-blue-100 p-1.5 rounded">
                            <SmileIcon size={20} />
                        </button>

                        <button className="hover:bg-blue-100 p-1.5 rounded">
                            <ClockIcon className="h-5 w-5" />
                        </button>

                        <button className="hover:bg-blue-100 p-1.5 rounded">
                            <MapPinIcon size={20} />
                        </button>

                    </div>

                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600"
                    >
                        Post
                    </button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
}
