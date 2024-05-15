import express from "express";

import {
  registerUser,
  loginUser,
  getProfiles,
  registerProfile,
  updateUserAcc,
  updateProfileAcc,
  getUserByUsername,
  deleteProfileAcc,
  deleteBusinessAcc
} from "../controllers/user";
import { tokenAuth, checkCredentials } from "../middleware/index";
import { findUserByEmail } from "services/user";

export default (router: express.Router) => {
  // business acc
  router.post("/login", tokenAuth, loginUser);
  router.post("/register", tokenAuth, checkCredentials, registerUser);
  router.get("/business/findByUsername/:username", tokenAuth, getUserByUsername);
  router.get("/business/findByEmail/:email", tokenAuth, findUserByEmail);
  router.patch("/business/update/:id", tokenAuth, updateUserAcc);
  router.delete("/business/delete/:id", tokenAuth, deleteBusinessAcc);
  
  // profile
  router.get("/profile/retrieve/:id", tokenAuth, getProfiles);
  router.post("/profile/register/:id", tokenAuth, registerProfile);
  router.patch("/profile/update/:id", tokenAuth, updateProfileAcc);
  router.delete("/profile/delete/:id", tokenAuth, deleteProfileAcc);
};
  