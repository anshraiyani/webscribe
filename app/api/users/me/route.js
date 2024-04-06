import { getTokenData } from "@/utils/getTokenData";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDB } from "@/utils/mongodb_connection";

export const GET = async (request) => {
  try {
    connectToDB()
    const userID = await getTokenData(request);
    const user = await User.findOne({ _id: userID }).select("-password");
    return NextResponse.json({ data: user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
