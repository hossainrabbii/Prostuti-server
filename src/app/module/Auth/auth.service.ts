import bcrypt from "bcryptjs";
import { UserModel } from "./auth.model.js";
import { ILoginPayload } from "./auth.interface.js";

export const AuthService = {
  // register new user
  register: async (email: string, password: string) => {
    const existing = await UserModel.findOne({ email });
    if (existing) {
      throw new Error("Email already registered");
    }

    const user = await UserModel.create({ email, password });

    return {
      id: user._id,
      email: user.email,
      role: user.role,
    };
  },

  // validate credentials and return user
  login: async ({ email, password }: ILoginPayload) => {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return {
      id: user._id as string,
      email: user.email,
      role: user.role,
    };
  },

  // get user by id
  getById: async (id: string) => {
    const user = await UserModel.findById(id); 
    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user._id,
      email: user.email,
      role: user.role,
    };
  },

  // get fresh user for refresh token
  getRefreshUser: async (id: string) => {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User no longer exists");
    }

    return {
      id: user._id as string,
      email: user.email,
      role: user.role,
    };
  },
};