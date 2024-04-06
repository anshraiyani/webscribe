import Docs from "@/models/Docs";
import User from "@/models/User";
import { getTokenData } from "@/utils/getTokenData";
import { connectToDB } from "@/utils/mongodb_connection";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_AD6P4XNhuoHASNd371aOkKShLFir3pa8WwcyuRH9rAn1K9fbBc-aXeHLAlR32kur",
});

export async function POST(request) {
  try {
    const { room } = await request.json();
    connectToDB();
    const userID = await getTokenData(request);
    // console.log(userID)
    const user = await User.findOne({ _id: userID });
    const doc = await Docs.findOne({ _id: room });
    if (
      !doc ||
      (!doc.owner.equals(userID) && !doc.collaborators.includes(userID))
    ) {
      return new Response("Unauthorized", { status: 403 });
    }

    const session = liveblocks.prepareSession(`user-${userID}`, {
      userInfo: user,
    });

    session.allow(room, session.FULL_ACCESS);

    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    console.log(error);
  }
}
