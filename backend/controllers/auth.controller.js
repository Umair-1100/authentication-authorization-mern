import { User } from "../models/user.model.js";

export const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    console.log(existingUser);

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered. Please log in instead.",
      });
    }

    await User.create({
      name: fullName,
      email,
      password,
    });
    res.status(201).json({ message: "User registered successfully" });
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

    return res.status(200).json({
      success: true,
      message: "User login successfully.",
    });
  } catch (error) {
    next(error);
  }
};
