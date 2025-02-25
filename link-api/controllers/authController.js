import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Referral from "../models/Referral.js";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import crypto from "crypto";

// ✅ Forgot Password - Generate Token & Send Email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Token valid for 15 min
    await user.save();

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset email sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    // Hash new password and update user
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ User Registration
export const register = async (req, res) => {
  try {
    const { username, email, password, referralCode } = req.body;

    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already in use" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    let referredBy = null;
    let referrer = null;

    // Check for a valid referral code
    if (referralCode) {
      referrer = await User.findOne({ referralCode });
      if (!referrer)
        return res.status(400).json({ error: "Invalid referral code" });
      referredBy = referrer._id;
    }

    // Generate a referral code for the new user
    const userReferralCode = uuidv4();

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      referralCode: userReferralCode,
      referredBy,
    });

    await newUser.save();

    // Store referral information
    if (referrer) {
      console.log("Referral tracking triggered");
      console.log("Referrer ID:", referrer._id);
      console.log("Referred User ID:", newUser._id);

      await Referral.create({
        referrerId: referrer._id,
        referredUserId: newUser._id,
        status: "successful",
      });

      console.log("Referral successfully saved in DB");
    }

    res.status(201).json({
      message: "User registered successfully",
      referralCode: newUser.referralCode,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Duplicate entry: username or email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

// ✅ User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
