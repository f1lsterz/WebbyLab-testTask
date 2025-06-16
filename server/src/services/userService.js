import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ApiError from "../utils/apiError.js";

dotenv.config();

class UserService {
  async createUser(userData) {
    const { email, name, password, confirmPassword } = userData;

    if (password !== confirmPassword) {
      throw new ApiError("PASSWORDS_NOT_EQUAL", {
        password: "NOT_EQUAL",
        confirmPassword: "NOT_EQUAL",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError("EMAIL_NOT_UNIQUE", { email: "NOT_UNIQUE" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return token;
  }
}

export default new UserService();
