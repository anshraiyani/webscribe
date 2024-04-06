import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    unique: [true, "username already exists"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "email already in use"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
