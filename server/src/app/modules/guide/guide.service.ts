import { Request } from "express";
import { QueryBuilder } from "../../lib/queryBuilder";
import { IUser, UserRole } from "../user/user.interface";
import User from "../user/user.model";
import mongoose from "mongoose";
import AppError from "../../helpers/appError";
import { Guide } from "./guide.model";
import { HTTP_STATUS } from "../../utils/httpStatus";
import { IGuide } from "./guide.interface";
import { DynamicQueryBuilder } from "../../lib/queryBuilderByPipline";
import { Booking } from "../booking/booking.model";

const getGuides = async (queryString?: Record<string, string>) => {
  const builder = new QueryBuilder<IGuide>(Guide, {
    ...queryString,
  });
  const res = await builder
    .filter()
    .search(["email", "name", "phone"])
    .paginate()
    .select(["-password"])
    .execWithMeta();

  const builder2 = new DynamicQueryBuilder<IGuide>(
    Guide,
    {
      ...queryString,
    },
    [
      {
        model: User,
        localField: "userId",
        foreignField: "_id",
        as: "profile",
        filterKeys: ["gender", "role"],
        searchFields: ["name", "email", "phone"],
      },
    ]
  );
  const res2 = await builder2
    .searchPopulated() // Search populated models (includes documents)
    .filter() // Filter main model
    .filterPopulated() // Filter populated models (reuses same populated docs)
    .sort()
    .paginate()
    .exec();

  return { guides: res2.data, meta: res.meta };
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
          roleProfileModel: "Guide",
        },
      ],
      { session }
    );

    // Create guide profile
    const [guide] = await Guide.create(
      [
        {
          userId: user._id,
          ...payload,
        },
      ],
      { session }
    );

    user.profile = guide._id;
    await user.save({ session });

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

const updateGuide = async (req: Request) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { id } = req.params;
    const data = req.body;

    const guide = await Guide.findOne({ userId: id });
    if (!guide) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "Guide not found");
    }

    // Update guide
    await Guide.findOneAndUpdate(
      { userId: id },
      {
        $set: {
          languages: data.languages,
          expertise:
            data?.expertise?.map((i: string) => i.trim()).filter(Boolean) || [],
          experienceYears: data.experienceYears,
          hourlyRate: data.hourlyRate,
        },
      },

      { new: true }
    ).session(session);

    // Update user
    await User.findOneAndUpdate(
      { _id: id },
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

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return await User.findById(id).populate("profile");
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const deleteGuide = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const guide = await Guide.findOne({ userId: id }).session(session);
    if (!guide) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "Guide not found");
    }
    await User.updateOne({ _id: id }, { isDeleted: true }).session(session);
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: "Guide deleted successfully", data: null };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getActiveTours = async (id: string) => {
  return await Booking.find({
    user: id,
  }).populate({
    path: "trip",
    populate: {
      path: "tourId",
    },
  });
};

export const GuideService = {
  getGuides,
  getGuide,
  createGuide,
  updateGuide,
  deleteGuide,
  getActiveTours,
};
