import { Request } from "express";
import { QueryBuilder } from "../../lib/queryBuilder";
import { IUser, UserRole } from "../user/user.interface";
import User from "../user/user.model";
import mongoose from "mongoose";
import AppError from "../../helpers/appError";
import { Guide } from "./guide.model";

const getGuides = async (queryString?: Record<string, string>) => {
  const builder = new QueryBuilder<IUser>(User, {
    ...queryString,
    isDeleted: "false",
    role: "GUIDE",
  });
  const res = await builder
    .filter()
    .search(["email", "name", "phone"])
    .paginate()
    .select(["-password"])
    .execWithMeta();

  return { guides: res.data, meta: res.meta };
};

const getGuide = async (id: string) => {
  const guide = await Guide.findOne({ userId: id }).populate(
    "userId",
    "-password"
  );

  return guide;
};

const createGuide = async (req: Request) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const payload = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email: payload.email }).session(
      session
    );

    if (existingUser) {
      if (existingUser.isDeleted) {
        // Delete the soft-deleted user and associated guide
        await User.deleteOne({ _id: existingUser._id }).session(session);
        await Guide.deleteOne({ userId: existingUser._id }).session(session);
      } else {
        throw new AppError(409, "User already exists with this email.");
      }
    }

    // Create new user
    const [user] = await User.create(
      [
        {
          ...payload,
          role: UserRole.GUIDE,
        },
      ],
      { session }
    );

    // Create guide profile
    await Guide.create(
      [
        {
          userId: user._id,
          ...payload.guide,
        },
      ],
      { session }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return user;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateGuide = async (req: Request) => {};

const deleteGuide = async (req: Request) => {};

export const GuideService = {
  getGuides,
  getGuide,
  createGuide,
  updateGuide,
  deleteGuide,
};
