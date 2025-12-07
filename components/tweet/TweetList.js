"use client";

import { useState, useEffect } from "react";
import TweetCard from "./TweetCard";
import TweetForm from "./TweetForm"

export default function TweetList({ user }) {
    // const tweets = await getTweets();
    const [tweets, setTweets] = useState(null);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const fetchTweet = async () => {
            try {
                const response = await fetch(`/api/tweet?userId=${user._id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const data = await response.json();
                console.log(data);
                setTweets(data.tweets);

            }
            catch (error) {
                setError('Error: ', error);
            }
        }
        fetchTweet();
    }, [refresh]);

    const handleAddTweet = () => {
        setRefresh(prev => prev + 1);
    }

    if (tweets === null) return <p>Loading...</p>;

    return (
        <div>
            {/* What's happening */}
            <TweetForm onAddTweet={handleAddTweet} user={user} />
            {/* Tweets */}
            {tweets?.map((tweet) => (
                <TweetCard key={tweet?._id} tweet={tweet} user={user} />
            ))}
        </div>
    );
}
