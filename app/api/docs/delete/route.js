import docSchema from "@/models/Docs";
import { connectToDB } from "@/utils/mongodb_connection";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { docID } = await request.json();
    await connectToDB();
    const deletedDoc = await docSchema.findByIdAndDelete(docID);
    if (!deletedDoc) {
      return NextResponse.json(
        { message: "Document not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Document Deleted!",
        deletedDoc,
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
