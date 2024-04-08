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
  router.post("/registerProfile/:id", tokenAuth, registerProfile);
  router.get("/profiles/:id", tokenAuth, getProfiles);
  router.patch("/updateUserAcc/:id", tokenAuth, updateUserAcc);
  router.patch("/updateProfileAcc/:id", tokenAuth, updateProfileAcc);
};
