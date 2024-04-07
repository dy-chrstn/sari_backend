import express from "express";
import bcrypt from "bcrypt";

import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../services/user";

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await createUser(username, email, hashPassword);

    return res.status(200).json({
      messages: {
        code: 0,
        message: "User created",
      },
      response: user,
    });
  } catch (error) {
    return res.sendStatus(400).json({
      messages: {
        code: 1,
        message: "Internal server error",
      },
      response: {},
    });
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { usernameOrEmail, password } = req.body;

    let user =
      (await findUserByUsername(usernameOrEmail)) ||
      (await findUserByEmail(usernameOrEmail));

    if (!user) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "User not found",
        },
        response: {},
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "Invalid credentials",
        },
        response: {},
      });
    }

    return res.status(200).json({
      messages: {
        code: 0,
        message: "User logged in",
      },
      response: user,
    });
  } catch (error) {
    return res.status(500).json({
      messages: {
        code: 1,
        message: "Internal server error",
      },
      response: {},
    });
  }
};
