import Docs from "@/models/Docs";
import { connectToDB } from "@/utils/mongodb_connection";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { docID } = await req.json();
    connectToDB();
    const doc = await Docs.findOne({ _id: docID });
    return NextResponse.json(
      {
        message: "Documents found successfully",
        doc,
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
