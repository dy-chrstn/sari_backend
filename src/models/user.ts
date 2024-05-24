import mongoose from "mongoose";

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const profileSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  pin: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

userSchema.pre("updateOne", async function (next) {
  this.set({ updatedAt: Date.now() });
  next();
})

profileSchema.pre("updateOne", async function (next) {
  this.set({ updatedAt: Date.now() });
  next();
})

const UserModel = mongoose.model("User", userSchema);
const ProfileModel = mongoose.model(
  "Profile",
  profileSchema
);

export { UserModel, ProfileModel };
