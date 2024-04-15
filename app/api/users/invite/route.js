import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDB } from "@/utils/mongodb_connection";
import Docs from "@/models/Docs";

export const POST = async (request) => {
  try {
    connectToDB();
    const { email, docID } = await request.json();
    const user = await User.findOne({ email: email }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    const userdoc = await Docs.findById(docID);

    if (userdoc.owner.toString() === user._id.toString()) {
      return NextResponse.json(
        { error: "User is the owner of the document!" },
        { status: 403 }
      );
    }

    if (userdoc.collaborators.includes(user._id)) {
      return NextResponse.json(
        { error: "User is already a collaborator of the document" },
        { status: 409 }
      );
    }

    const doc = await Docs.updateOne(
      { _id: docID },
      { $push: { collaborators: user._id } }
    );

    return NextResponse.json({ message: "User added", data: doc });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
