import express from "express";
import bcrypt from "bcrypt";

import {
  createUser,
  createProfile,
  findUserByEmail,
  findUserByUsername,
  findAllProfiles,
} from "../services/user";

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.sendStatus(400).json({
        messages: {
          code: 1,
          message: "Missing required fields",
        },
        response: {},
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await createUser(username, email, hashPassword);

    if (!user) {
      return res.sendStatus(400).json({
        messages: {
          code: 1,
          message: "User already exists",
        },
        response: {},
      })
    }

    return res.status(200).json({
      messages: {
        code: 0,
        message: "User created",
      },
      response: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },

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
    const { username, password } = req.body;

    let user =
      (await findUserByUsername(username)) ||
      (await findUserByEmail(username));

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
      response: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
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

export const registerProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.id;
    const { name, pin } = req.body;

    const profile = await createProfile(userId, name, pin);

    return res.status(200).json({
      messages: {
        code: 0,
        message: "Profile created",
      },
      response: profile,
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
}

export const getProfiles = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.userId;
    const profiles = await findAllProfiles(userId);
    return res.status(200).json({
      messages: {
        code: 0,
        message: "Profiles retrieved",
      },
      response: profiles,
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


