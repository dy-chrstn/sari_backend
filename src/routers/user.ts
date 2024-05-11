import express from "express";

import {
  registerUser,
  loginUser,
  getProfiles,
  registerProfile,
  updateUserAcc,
  updateProfileAcc,
} from "../controllers/user";
import { tokenAuth, checkCredentials } from "../middleware/index";

export default (router: express.Router) => {
  router.post("/register", tokenAuth, checkCredentials, registerUser);
  router.post("/login", tokenAuth, loginUser);
  router.post("/profile/register/:id", tokenAuth, registerProfile);
  router.get("/profile/retrieve/:id", tokenAuth, getProfiles);
  router.patch("/business/update/:id", tokenAuth, updateUserAcc);
  router.patch("/profile/update/:id", tokenAuth, updateProfileAcc);
};
  