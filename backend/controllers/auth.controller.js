import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export default class AuthController {
  //Register user
  postRegister = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      //checking existing user
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User already exist",
        });
      }

      //hashed password
      const hashedPassword = await bcrypt.hash(password, 10);

      //add new user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Registration failed",
        error: error.message,
      });
    }
  };

  //Login user
  postLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      //validate user
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      //compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      //generate token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Login failed",
        error: error.message,
      });
    }
  };

  logout = async (req, res) => {
    try {
        return res.status(200).json({
          success: true,
          message: "Logout successful",
        });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Logout failed",
        error: error.message,
      });
    }
  };
}
