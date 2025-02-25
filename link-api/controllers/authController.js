import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Referral from "../models/Referral.js";
import { v4 as uuidv4 } from "uuid";

const userReferralCode = uuidv4();

export const register = async (req, res) => {
  try {
    const { username, email, password, referralCode } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already in use" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let referredBy = null;
    let referrer = null;

    if (referralCode) {
      referrer = await User.findOne({ referralCode });
      if (!referrer)
        return res.status(400).json({ error: "Invalid referral code" });
      referredBy = referrer._id;
    }

    const userReferralCode = uuidv4();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      referralCode: userReferralCode,
      referredBy,
    });

    await newUser.save();

    if (referrer) {
      await Referral.create({
        referrerId: referrer._id,
        referredUserId: newUser._id,
        status: "successful",
      });
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
