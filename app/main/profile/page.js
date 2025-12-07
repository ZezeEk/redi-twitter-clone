import ProfilePage from "../../../components/Profile/ProfilePage";
import { getUserFromToken } from "@/lib/auth/getUser";

export default async function Profile() {
  const user = await getUserFromToken();

  return (
    <div className="p-4">
      <ProfilePage user = {user} />
    </div>
  );
}