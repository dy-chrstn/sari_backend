import express from "express";
import bcrypt from "bcrypt";

import {
  createUser,
  createProfile,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  findProfile,
  findAllProfiles,
  updateUser,
  updateProfile,
  deleteUser,
  deleteProfile
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
    const userId = req.params.id;

    const userExists = await findUserById(userId);

    if (!userExists) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "User not found",
        },
        response: {},
      });
    }

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

export const updateUserAcc = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    const user = await findUserById(userId);

    if (!user) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "User not found",
        },
        response: {},
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      hashPassword,
    };

    const updatedUser = await updateUser(userId, newUser);

    if (!updatedUser) {
      return res.status(500).json({
        messages: {
          code: 1,
          message: "Failed to update user",
        },
        response: {},
      });
    }

    return res.status(200).json({
      messages: {
        code: 0,
        message: "User updated",
      },
      response: {
        userId: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
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
}

export const updateProfileAcc = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.id;
    const { name, pin } = req.body;
    const profile = await findProfile(userId);

    if (!profile) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "Profile not found",
        },
        response: {},
      });
    }

    const newProfile = {
      name,
      pin
    };

    const updatedProfile = await updateProfile(userId, newProfile);

    if (!updatedProfile) {
      return res.status(500).json({
        messages: {
          code: 1,
          message: "Failed to update profile",
        },
        response: {},
      });
    }


    return res.status(200).json({
      messages: {
        code: 0,
        message: "Profile updated",
      },
      response: {
        _id: updatedProfile._id,
        owner: updatedProfile.owner,
        name: updatedProfile.name,
        pin: updatedProfile.pin
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
}

export const deleteBusinessAcc = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.id;

    const user = await findUserById(userId);

    if (!user) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "User not found",
        },
        response: {},
      });

    }

    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {

      return res.status(500).json({
        messages: {
          code: 1,
          message: "Failed to delete user",
        },
        response: {},
      });

    }

    return res.status(200).json({
      messages: {
        code: 0,
        message: "User deleted",
      },
      response: {},
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

export const deleteProfileAcc = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = req.params.id;
    const profile = await findProfile(userId);

    if (!profile) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "Profile not found",
        },
        response: {},
      });
    }

    const deletedProfile = await deleteProfile(userId);

    if (!deletedProfile) {
      return res.status(500).json({
        messages: {
          code: 1,
          message: "Failed to delete profile",
        },
        response: {},
      });
    }

    return res.status(200).json({
      messages: {
        code: 0,
        message: "Profile deleted",
      },
      response: {},
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

export const getUserByUsername = async (req: express.Request, res: express.Response) => {
  try {
    const username = req.params.username;
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "Username does not exist",
        },
        response: {},
      });
    }

    return res.status(200).json({
      messages: {
        code: 0,
        message: "Username already exist",
      },
      response: {
        _id: user._id,
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
}

export const getUserByEmail = async (req: express.Request, res: express.Response) => {
  try {
    const email = req.params.email;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        messages: {
          code: 1,
          message: "Email does not exist",
        },
        response: {},
      });
    }

    return res.status(200).json({
      messages: {
        code: 0,
        message: "Email already exist",
      },
      response: {
        _id: user._id,
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
}