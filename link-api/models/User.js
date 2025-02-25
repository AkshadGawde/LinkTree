import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, unique: true, default: uuidv4 },
    referredBy: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
