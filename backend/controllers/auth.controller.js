import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered. Please log in instead.",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const newUser = await User.create({
      name: fullName,
      email,
      password,
      isEmailVerified: false,
      status: "pending",
      verificationToken,
      verificationTokenExpires,
    });

    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Verification token is required." });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token.",
      });
    }

    user.isEmailVerified = true;
    user.status = "active";
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully! You can now login.",
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (user.isEmailVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account is already verified." });
    }

    const newVerificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = newVerificationToken;
    user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await user.save();

    await sendVerificationEmail(user.email, newVerificationToken);

    return res.status(200).json({
      success: true,
      message: "Verification email resent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email }).select("+password");

    if (!isUserExist) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const isPasswordMatched = await isUserExist.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!isUserExist.isEmailVerified) {
      return res.status(403).json({
        message:
          "Please verify your email address before accessing this resource.",
      });
    }

    if (isUserExist.status === "disabled") {
      return res.status(403).json({
        message:
          "Your account has been disabled. Please contact support for assistance.",
      });
    }

    const token = generateToken(isUserExist._id);

    return res.status(200).json({
      success: true,
      message: "User login successfully.",
      token,
      user: {
        id: isUserExist._id,
        name: isUserExist.name,
        email: isUserExist.email,
        status: isUserExist.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};
