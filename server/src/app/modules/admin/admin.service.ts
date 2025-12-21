import { Request } from "express";
import AppError from "../../helpers/appError";
import { generateStrongPassword } from "../../helpers/generate-password";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import { uploadFileToCloudinary } from "../../utils/upload-files";

const createUser = async (req: Request) => {
  const payload: Partial<IUser> = req.body;
  const isExists = await User.findOne({ email: payload.email });
  if (isExists) {
    throw new AppError(409, "User already exist with this email.");
  }

  if (req.file) {
    const uploadRes = await uploadFileToCloudinary(
      req.file as Express.Multer.File,
      "local-guide"
    );
    if (!uploadRes) throw new AppError(500, "Failed to upload profile image.");
    payload.profileImage = uploadRes?.url;
  }

  const password = generateStrongPassword();
  payload.password = password;
  const user = await User.create(payload);
  return user;
};

const deleteUser = async (req: Request) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError(404, "User not found.");
  }
  return user;
};

export const AdminService = { createUser, deleteUser };
