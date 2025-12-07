import ProfileSection from "./Profile/ProfileSection";
import { getUserFromToken } from "@/lib/auth/getUser";
import UserModel from "../lib/models/UserModel";
import SidebarClient from "./SidebarClient";

export default async function Sidebar() {

  const userData = await getUserFromToken();
  const user = await UserModel.findById(userData._id).lean();

  return (
    <div className="flex flex-col justify-between h-screen px-2 py-4 border-r border-gray-200">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-3xl font-bold text-black mb-4">𝕏</div>
        <SidebarClient/>
      </div>

      {/* <div className="flex justify-center">
        <button className="bg-black text-white rounded-full p-4 hover:bg-gray-800 transition relative flex items-center justify-center">
          <PencilSquareIcon className="h-6 w-6 text-white" />
          <RocketLaunchIcon className="h-4 w-4 text-white absolute bottom-2 right-2" />
        </button>
      </div> */}
      <div className="flex justify-center">
        <ProfileSection image={user?.image} name={user?.name} />
      </div>

    </div>
  );
}
