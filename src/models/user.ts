import mongoose, { Document, Schema, Model } from "mongoose";

interface UserDoc extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface ProfileDoc extends Document {
  owner: UserDoc["_id"];
  name: string;
  pin: number;
}

const userSchema: Schema<UserDoc> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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

const profileSchema: Schema<ProfileDoc> = new mongoose.Schema({
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

const UserModel: Model<UserDoc> = mongoose.model("User", userSchema);
const ProfileModel: Model<ProfileDoc> = mongoose.model(
  "Profile",
  profileSchema
);

export { UserModel, ProfileModel };
