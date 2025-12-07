import TweetList from "../../components/tweet/TweetList";
import { getUserFromToken } from "@/lib/auth/getUser";

export default async function Main() {
  const user = await getUserFromToken();

  return (
    <TweetList user={user}/>

  );
}
