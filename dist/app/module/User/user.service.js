import bcrypt from "bcrypt";
import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
const registerUser = async (data) => {
    const isEmailExist = await UserModel.findOne({ email: data.email });
    if (isEmailExist) {
        throw new Error("এই ইমেইলটি দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const userData = {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        facebook: data.facebook || "",
        role: data.role || "student",
        isActive: true,
    };
    const newUser = await UserModel.create(userData);
    const result = newUser.toObject();
    const jwtPayload = {
        userId: result._id,
        email: result.email,
        role: result.role,
    };
    const accessToken = jwt.sign(jwtPayload, process.env.JWT_ACCESS_SECRET || "a052d8fb308450aef0d3d08cd0255ef7c2de5c93b47910e837f318cee74aa3856eac16b0812b30c0b5846a4d259d6b86530c66f1603ef80d13e87d2dbac87300", { expiresIn: "7d" });
    const { password, ...userWithoutPassword } = result;
    return {
        user: userWithoutPassword,
        accessToken,
    };
};
// login user
const loginUser = async (payload) => {
    const user = await UserModel.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new Error("এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি!");
    }
    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Error("ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।");
    }
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = jwt.sign(jwtPayload, process.env.JWT_ACCESS_SECRET || "a052d8fb308450aef0d3d08cd0255ef7c2de5c93b47910e837f318cee74aa3856eac16b0812b30c0b5846a4d259d6b86530c66f1603ef80d13e87d2dbac87300", { expiresIn: "7d" });
    const userObj = user.toObject();
    const { password, ...userWithoutPassword } = userObj;
    return {
        user: userWithoutPassword,
        accessToken,
    };
};
export const userServices = {
    registerUser, loginUser
};
//# sourceMappingURL=user.service.js.map