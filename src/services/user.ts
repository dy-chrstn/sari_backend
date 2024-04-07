import { UserModel, ProfileModel } from "../models/user";


export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email: email });
}

export const findUserByUsername = async (username: string) => {
  return await UserModel.findOne({ username: username });
}

export const createUser = async (
  username: string,
  email: string,
  password: string) => {
  try {
    return await new UserModel({
      username,
      email,
      password,
    }).save();
  } catch (error) {
    return console.log(error)
  }
}

export const createProfile = async (
  userId: string,
  name: string,
  pin: number
) => {
  return await new ProfileModel({
    userId,
    name,
    pin
  }).save();
}

export const findAllProfiles = async (userId: string) => {
  return await ProfileModel.find({ owner: userId });
}
