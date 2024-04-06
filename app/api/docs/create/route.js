import docSchema from "@/models/Docs";
import { connectToDB } from "@/utils/mongodb_connection";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { title, ownerID } = await request.json();
    connectToDB();
    const newDoc = new docSchema({
      title: title,
      owner: ownerID,
      createdOn: new Date(),
    });
    const savedDoc = await newDoc.save();
    return NextResponse.json(
      {
        message: "New Document Created!",
        savedDoc,
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
