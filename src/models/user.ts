import mongoose, { Document, Schema, Model } from "mongoose";

const userSchema= new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const profileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
  },
  pin: {
    type: Number,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);
const ProfileModel = mongoose.model(
  "Profile",
  profileSchema
);

export { UserModel, ProfileModel };
