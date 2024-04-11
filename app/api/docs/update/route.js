import docSchema from "@/models/Docs";
import { connectToDB } from "@/utils/mongodb_connection";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { docID, title } = await request.json();
    await connectToDB();
    const updatedDoc = await docSchema.findByIdAndUpdate(
      { _id: docID },
      { title: title },
      { new: true }
    );
    if (!updatedDoc) {
      return NextResponse.json(
        { message: "Document not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Document Updated!",
        updatedDoc,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};
