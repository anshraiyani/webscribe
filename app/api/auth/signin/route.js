import User from "@/models/User";
import { connectToDB } from "@/utils/mongodb_connection";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "Email not Registered." },
        { status: 400 }
      );
    }
    const correct = await bcrypt.compare(password, existingUser.password);
    if (!correct) {
      return NextResponse.json(
        { error: "Incorrect Password." },
        { status: 400 }
      );
    }

    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const response = NextResponse.json({
      message: "Sigin Successful.",
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
