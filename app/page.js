import TweetCard from "../components/TweetCard";
import Link from 'next/link';

async function getTweets (){
  const rest = await fetch('https://dummyjson.com/posts');
  return rest.json();
}

export default async function Home() {
const tweets = await getTweets();

  return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-8 pb-20  sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1>📝 Latest Tweets</h1>
          {tweets?.posts?.map((tweet)=>(
              <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
                 <TweetCard key = {tweet.id} tweet = {tweet} />
              </Link>           
            ))
          }
        </main>
      </div>
  );
}
