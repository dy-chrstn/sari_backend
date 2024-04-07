import { UserModel, ProfileModel } from "../models/user";


export const findUserByEmail = async (email: string) => {
  try{
    return await UserModel.findOne({ email: email });
  } catch (error) {
    return console.log(error)
  }
}

export const findUserByUsername = async (username: string) => {
  try{
    return await UserModel.findOne({ username: username });
  } catch (error) {
    return console.log(error)
  }
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
  try{
    return await ProfileModel.find({ userId: userId });
  } catch (error) {
    return console.log(error)
  }
}
