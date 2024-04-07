import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    expiresAt: { type: Date, default: Date.now},
  },
);

TokenSchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 60,
  }
);

export const TokenModel = mongoose.model("Token", TokenSchema)