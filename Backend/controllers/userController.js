import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }
    const file = req.file;
    let fileUri = "",
      cloudResponse = "";
    if (file) {
      fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse?.secure_url,
      },
    });
    return res.status(200).json({
      message: "Registerd Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in registerAPI", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || role !== user.role) {
      return res.status(400).json({
        message: "Incorrect Credentials",
        success: false,
      });
    }
    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log("Error in LoginAPI", error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in LogoutAPI", error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;
    const file = req.file;
    let fileUri, cloudResponse;
    if (file) {
      fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
      });
    }

    let skillsArray;
    let user = await User.findById(userId);

    //updating
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      skillsArray = skills.split(",");
      user.profile.skills = skillsArray;
    }

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }
    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "User updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in UpdateProfileAPI", error);
  }
};
