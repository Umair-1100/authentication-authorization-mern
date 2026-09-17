import argon2 from "argon2";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Full Name is required."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["active", "blocked", "pending"],
    default: "pending",
  },
  verificationToken: {
    type: String
  },
  verificationTokenExpires: { type: Date }
}, { timestamps: true });

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await argon2.hash(this.password);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await argon2.verify(this.password, candidatePassword);
  } catch (error) {
    return false;
  }
};

export const User = mongoose.model("User", userSchema);
