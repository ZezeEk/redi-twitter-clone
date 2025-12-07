import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/lib/models/UserModel";
import connectDb from "@/lib/config/database";

export async function getUserFromToken() {
  try {
    await connectDb();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) return null;

    const user = await User.findById(decoded.id).lean();

    if (!user) return null;

    return user; 
    
  } catch (err) {
    console.error("Error in getUserFromToken:", err);
    return null;
  }
}
