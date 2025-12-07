import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import connectDb from "@/lib/config/database";
import { generateToken } from "@/utils/jwt";

connectDb();

export async function POST(request) {
    try {
        const { name, email, password, image, agree } = await request.json();

        if (!name || !email || !password || agree != true) {
            return NextResponse.json({
                success: false,
                type: "AllFields",
                message: "All required fields must be filled"
            },
                { status: 400 }
            );
        }

        const existUser = await UserModel.findOne({ email }).lean();
        if (existUser) {
            return NextResponse.json({
                success: false,
                message: "Email is already registered"
            },
                { status: 400 }
            );
        }

        //const hashedPassword = await bcrypt.hash(password,10);

        const user = await UserModel.create({
            name, email, password, image, agree
        });

        const token = generateToken(user._id);

        const response = NextResponse.json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token,
        }, { status: 201 });

        //cookies
        response.cookies.set("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60,
            path:"/"
        });

        return response;
    }
    catch (error) {
        console.log("Registering error: ", error);
        return NextResponse.json(
            { message: "Error registering: ", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        const userById = await UserModel.findById( userId ).lean();
        return NextResponse.json({ success: true, userById });

    }
    catch (error) {
        return NextResponse.json({ message: "Error getUser function", error: error.message }, { status: 500 });
    }
}