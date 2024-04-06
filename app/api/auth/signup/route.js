import User from "@/models/User";
import { connectToDB } from "@/utils/mongodb_connection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request, response) => {
  const { username, email, password } = await request.json();
  await connectToDB();

  const existingEmail = await User.findOne({ email });
  const existingUser = await User.findOne({ username });
  if (existingEmail) {
    return NextResponse.json(
      { error: "email already registered." },
      { status: 400 }
    );
  }
  if (existingUser) {
    return NextResponse.json(
      { error: "username already exists." },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    return NextResponse.json(
      {
        message: "user created successfully",
        savedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
