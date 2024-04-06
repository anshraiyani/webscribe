import mongoose, { Schema } from "mongoose";

const docSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, "owner is required."],
    unique: false,
  },
  collaborators: {
    type: [{ type: Schema.Types.ObjectId }],
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.models.Doc || mongoose.model("Doc", docSchema);
