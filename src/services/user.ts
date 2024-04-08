import { UserModel, ProfileModel } from "../models/user";


export const findUserById = async (userId: string) => {
  try{
    return await UserModel.findOne({ _id: userId });
  } catch (error) {
    return console.log(error)
  }
}

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
  try{
    return await new ProfileModel({
      owner: userId,
      name,
      pin
    }).save();
  } catch (error) {
    return console.log(error)
  }
}

export const findAllProfiles = async (userId: string) => {
  try{
    return await ProfileModel.find({ owner: userId });
  } catch (error) {
    return console.log(error)
  }
}
