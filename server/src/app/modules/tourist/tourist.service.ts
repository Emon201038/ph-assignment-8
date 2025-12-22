import mongoose from "mongoose";
import { IUser, UserRole } from "../user/user.interface";
import User from "../user/user.model";
import { Tourist } from "./tourist.model";
import { HTTP_STATUS } from "../../utils/httpStatus";
import AppError from "../../helpers/appError";
import { QueryBuilder } from "../../lib/queryBuilder";
import { ITourist } from "./tourist.interface";

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
          ...rest,
          userId: user._id,
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

const getTourists = async (queryParams: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tourist, queryParams);

  // Apply filters first
  queryBuilder.filter();

  // Search by User name (populated field)
  await queryBuilder.searchPopulated(
    User,
    "userId",
    ["name", "email", "contactNumber"],
    "_id"
  );

  // Apply sorting, pagination, and population
  const result = await queryBuilder
    .sort()
    .paginate()
    .populate(["userId:name;email;contactNumber"], {
      userId: "user",
    }) // Populate the user data
    .execWithMeta();

  return { tourists: result.data, meta: result.meta };
};

export const TouristService = { createTourist, getTourists };
