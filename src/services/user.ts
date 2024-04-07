import { UserModel, ProfileModel } from "models/user";


export const findUserByEmail = (email: string) => UserModel.findOne({ email: email });

export const findUserByUsername = (username: string) => UserModel.findOne({ username: username });

export const createUser = async (
  username: string,
  email: string,
  password: string
) =>
  await new UserModel({
    username,
    email,
    password,
  }).save();
