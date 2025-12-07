import UserModel from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import connectDb from "@/lib/config/database";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/jwt";

connectDb();

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({
                success: false,
                message: "All required fields must be filled"
            },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ email }).select("+password").lean();

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'Invalid data'
            }, { status: 401 });
        }

        const isPassMatch = await bcrypt.compare(password, user.password);

        if (!isPassMatch) {
            return NextResponse.json({
                success: false,
                message: "Password is incorrect"
            }, { status: 401 });
        }

        const token = generateToken(user._id);

        const response = NextResponse.json({
            success: true,
            message: "Login succesfull",
            user: { id: user._id, name: user.name, email: user.email },
            token
        }, { status: 201 });

        //cookies
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60,
            path: "/"
        });

        return response;
    }
    catch (error) {
        console.log("Login error: ", error);
        return NextResponse.json(
            { message: "Error login: ", error: error.message },
            { status: 500 }
        );
    }
}
