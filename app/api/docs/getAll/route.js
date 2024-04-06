import Docs from "@/models/Docs";
import { connectToDB } from "@/utils/mongodb_connection";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { ownerID } = await req.json();
    connectToDB();
    const docs = await Docs.find({ owner: ownerID });
    return NextResponse.json(
      {
        message: "Documents found successfully",
        docs,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
};
