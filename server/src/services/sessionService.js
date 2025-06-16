import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class SessionService {
  async createSession(userData) {
    const { email, password } = userData;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new ApiError("AUTHENTICATION_FAILED", {
        email: "AUTHENTICATION_FAILED",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError("AUTHENTICATION_FAILED", {
        password: "AUTHENTICATION_FAILED",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return token;
  }
}

export default new SessionService();
