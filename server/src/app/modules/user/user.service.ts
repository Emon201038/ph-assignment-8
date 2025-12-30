import { JwtPayload } from "jsonwebtoken";
import AppError from "../../helpers/appError";
import { HTTP_STATUS } from "../../utils/httpStatus";
import { IUser, UserRole } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Tourist } from "../tourist/tourist.model";
import { QueryBuilder } from "../../lib/queryBuilder";
import {
  DynamicQueryBuilder,
  PopulatedModelConfig,
} from "../../lib/queryBuilderByPipline";
import { Guide } from "../guide/guide.model";

const getAllUsers = async (query?: Record<string, string>) => {
  const populatedArray: PopulatedModelConfig[] = [];

  if (query?.role === UserRole.GUIDE) {
    populatedArray.push({
      model: Guide,
      localField: "_id",
      foreignField: "userId",
      filterKeys: ["expertise", "languages"],
      as: "profile",
    });
  }
  if (query?.role === UserRole.TOURIST) {
    populatedArray.push({
      model: Tourist,
      localField: "_id",
      foreignField: "userId",
      filterKeys: ["interests"],
      as: "profile",
    });
  }

  const qb = new DynamicQueryBuilder(User, query, populatedArray);

  const res = await qb
    .search(["name", "email", "phone"])
    .filter()
    .filterPopulated()
    .sort()
    .paginate()
    .exec();

  if (query?.role === UserRole.GUIDE) {
    for (const user of res.data) {
      const ratingAgg = await User.aggregate([
        { $match: { _id: user._id } },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "docId",
            as: "reviews",
          },
        },
        {
          $project: {
            rating: {
              $ifNull: [{ $avg: "$reviews.rating" }, 0],
            },
          },
        },
      ]);

      const tripsAgg = await User.aggregate([
        { $match: { _id: user._id } },
        {
          $lookup: {
            from: "bookings",
            localField: "_id",
            foreignField: "guideId",
            as: "bookings",
          },
        },
        {
          $project: {
            totalTrips: { $size: "$bookings" },
          },
        },
      ]);

      user.profile.rating = ratingAgg[0]?.rating ?? 0;
      user.profile.totalTrips = tripsAgg[0]?.totalTrips ?? 0;
    }
  }

  return { users: res.data, meta: res.meta };
};

const getUser = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

export const createTourist = async (payload: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, ...rest } = payload;

    // Check if user already exists
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      if (existingUser.isDeleted) {
        // Remove soft-deleted user and related Tourist profile
        await User.deleteOne({ _id: existingUser._id }).session(session);
        await Tourist.deleteOne({ userId: existingUser._id }).session(session);
      } else if (existingUser.isBlocked) {
        throw new AppError(
          HTTP_STATUS.BAD_REQUEST,
          "User account has been blocked. Please contact admin"
        );
      } else {
        throw new AppError(
          HTTP_STATUS.CONFLICT,
          "User already exists with this email."
        );
      }
    }

    // Create new User
    const [user] = await User.create(
      [
        {
          email,
          ...rest,
          role: UserRole.TOURIST,
        },
      ],
      { session }
    );

    // Create Tourist profile
    await Tourist.create(
      [
        {
          userId: user._id,
          ...rest,
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

const updateUser = async (
  userId: string,
  payload: Partial<IUser> & { currentPassword?: string },
  loggedInUser: JwtPayload
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found.");
  }
  if (payload.email) {
    throw new AppError(HTTP_STATUS.FORBIDDEN, "You can't update email.");
  }

  if (loggedInUser.role !== UserRole.ADMIN) {
    if (user.isDeleted || user.isBlocked) {
      throw new AppError(HTTP_STATUS.FORBIDDEN, "User is blocked or deleted.");
    }

    if (payload.role === UserRole.ADMIN) {
      throw new AppError(
        HTTP_STATUS.FORBIDDEN,
        "Your not authorized to update role."
      );
    }

    // if (payload.isBlocked || payload.isVerified) {
    //   throw new AppError(
    //     HTTP_STATUS.FORBIDDEN,
    //     "Your not authorized to update status."
    //   );
    // }
  }

  if (payload.password) {
    const isMatchPass = await bcrypt.compare(
      payload?.currentPassword as string,
      user.password as string
    );
    if (!isMatchPass) {
      throw new AppError(HTTP_STATUS.BAD_REQUEST, "Invalid password.");
    }
  }

  return await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
};

const updateUserRole = async (userId: string, role: "SENDER" | "RECEIVER") => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found.");
  }
  if (user.role === UserRole.ADMIN) {
    throw new AppError(HTTP_STATUS.FORBIDDEN, "You can't update role.");
  }

  return await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true }
  );
};

const deleteUser = async (loggedInUser: JwtPayload, userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found.");
  }

  if (
    user.role === UserRole.ADMIN
    // user.adminInfo?.permissions.includes("DELETE_USER")
  ) {
    throw new AppError(
      HTTP_STATUS.FORBIDDEN,
      "You are not authorized to delete this user."
    );
  }

  if (loggedInUser.role !== UserRole.ADMIN) {
    if (loggedInUser.userId !== user._id.toString()) {
      throw new AppError(
        HTTP_STATUS.FORBIDDEN,
        "You are not authorized to delete this user."
      );
    }

    if (user.isDeleted || user.isBlocked) {
      throw new AppError(HTTP_STATUS.FORBIDDEN, "User is blocked or deleted.");
    }
  }

  return await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
};

export const UserService = {
  getAllUsers,
  getUser,
  createUser: createTourist,
  updateUser,
  updateUserRole,
  deleteUser,
};
