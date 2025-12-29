import mongoose from "mongoose";
import { IUser, UserRole } from "../user/user.interface";
import User from "../user/user.model";
import { Tourist } from "./tourist.model";
import { HTTP_STATUS } from "../../utils/httpStatus";
import AppError from "../../helpers/appError";
import { QueryBuilder } from "../../lib/queryBuilder";
import { Request } from "express";
import { uploadFileToCloudinary } from "../../utils/upload-files";
import { ITourist } from "./tourist.interface";

const createTourist = async (req: Request) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, ...rest } = req.body;

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

    if (req.file) {
      const uploadRes = await uploadFileToCloudinary(
        req.file as Express.Multer.File,
        "local-guide"
      );
      if (!uploadRes)
        throw new AppError(500, "Failed to upload profile image.");
      rest.profileImage = uploadRes?.url;
    }

    // Create new User
    const [user] = await User.create(
      [
        {
          email,
          name: req.body.name,
          password: req.body.password,
          phone: req.body.phone,
          address: req.body.address,
          gender: req.body.gender,
          profileImage: rest.profileImage,
          role: UserRole.TOURIST,
          bio: req.body.bio,
          roleProfileModel: "Tourist",
        },
      ],
      { session }
    );

    // Create Tourist profile
    const [tourist] = await Tourist.create(
      [
        {
          userId: user._id,
          preferredLanguage: req.body.preferredLanguage,
          interests:
            req.body.interests.map((i: string) => i.trim()).filter(Boolean) ||
            [],
          preferredCurrency: req.body.preferredCurrency,
          emergencyContact: req.body.emergencyContact,
        },
      ],
      { session }
    );

    user.profile = tourist._id;

    await user.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return user;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getTourists = async (queryParams: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tourist, queryParams);

  // Filter Tourist fields, excluding User-specific fields
  queryBuilder.filter(["gender", "role", "isBlocked", "isDeleted"]);

  // Build User filters
  const userFilters: Record<string, string> = {};
  if (queryParams.gender) userFilters.gender = "gender";
  if (queryParams.role) userFilters.role = "role";
  if (queryParams.isBlocked) userFilters.isBlocked = "isBlocked";
  if (queryParams.isDeleted) userFilters.isDeleted = "isDeleted";

  // Apply User filters if any exist
  if (Object.keys(userFilters).length > 0) {
    await queryBuilder.filterPopulated(User, "userId", userFilters);
  }

  // Search
  if (queryParams.searchTerm) {
    await queryBuilder.searchPopulated(User, "userId", [
      "name",
      "email",
      "phone",
    ]);
  }

  const result = await queryBuilder
    .sort()
    .paginate()
    .populate(["userId:name;email;phone;profileImage;gender"], {
      userId: "user",
    })
    .execWithMeta();

  return { tourists: result.data, meta: result.meta };
};

const getTouristById = async (id: string) => {
  const tourist = await Tourist.findById(id).populate("userId", "name email");
  if (!tourist) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "Tourist not found");
  }
  return tourist;
};

const updateTourist = async (id: string, data: Partial<ITourist & IUser>) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const tourist = await Tourist.findById(id);
    if (!tourist) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "Tourist not found");
    }
    await Tourist.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          preferredLanguage: data.preferredLanguage,
          interests:
            data?.interests?.map((i: string) => i.trim()).filter(Boolean) || [],
          preferredCurrency: data.preferredCurrency,
          emergencyContact: data.emergencyContact,
        },
      },

      { new: true }
    ).session(session);
    await User.findOneAndUpdate(
      { _id: tourist.userId },
      {
        $set: {
          name: data.name,
          phone: data.phone,
          address: data.address,
          gender: data.gender,
          bio: data.bio,
        },
      },
      { new: true }
    ).session(session);
    await session.commitTransaction();
    session.endSession();
    return await Tourist.findById(id).populate(
      "userId",
      "name email phone address gender bio createdAt isDeleted isBlocked"
    );
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const deleteTourist = async (id: string) => {
  const tourist = await Tourist.findById(id);
  if (!tourist) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "Tourist not found");
  }

  await User.updateOne({ _id: tourist.userId }, { $set: { isDeleted: true } });
  return tourist;
};

export const TouristService = {
  createTourist,
  getTourists,
  getTouristById,
  updateTourist,
  deleteTourist,
};
