import { Request } from "express";
import { QueryBuilder } from "../../../lib/queryBuilder";
import { IUser, UserRole } from "../user/user.interface";
import User from "../user/user.model";
import mongoose, { Types } from "mongoose";
import AppError from "../../../helpers/appError";
import { Guide } from "./guide.model";
import { HTTP_STATUS } from "../../../utils/httpStatus";
import { IGuide } from "./guide.interface";
import { DynamicQueryBuilder } from "../../../lib/queryBuilderByPipline";
import { Booking } from "../booking/booking.model";
import { Trip } from "../trip/trip.model";
import prisma from "../../../config/db";

const getGuides = async (queryString?: Record<string, string>) => {
  const res = await prisma.guideProfile.findMany({
    select: {
      specialties: true,
      languages: true,
    },
  });

  const total = await prisma.guideProfile.count();

  return {
    guides: [...new Set(res.flatMap((guide) => guide.languages))],
    meta: { total, limit: 20, page: 1 },
  };
};

const getGuide = async (id: string) => {
  const guide = await Guide.findOne({ userId: id }).populate(
    "userId",
    "-password",
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
      session,
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
      { session },
    );

    // Create guide profile
    const [guide] = await Guide.create(
      [
        {
          userId: user._id,
          ...payload,
        },
      ],
      { session },
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

      { new: true },
    ).session(session);

    console.log({
      name: data.name,
      phone: data.phone,
      address: data.address,
      gender: data.gender,
      bio: data.bio,
    });

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
      { new: true },
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
  const user = await User.findById(id).lean();

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
  }

  if (user.role === UserRole.GUIDE) {
    return await Booking.find({
      isDeleted: false,
    })
      .populate({
        path: "trip",
        match: {
          guideId: new Types.ObjectId(id),
          isDeleted: false,
        },
        populate: [
          {
            path: "tourId",
            select:
              "title city country price duration images averageRating totalReviews",
          },
          {
            path: "guideId",
            select: "name email phone profileImage",
          },
        ],
      })
      // remove bookings where trip didn't match
      .then((bookings) => bookings.filter((b) => b.trip !== null))
      .then((bookings) => bookings.map((b) => b.toObject()));
  }
  if (user.role === UserRole.TOURIST) {
    return await Booking.find({
      user: new Types.ObjectId(id),
      isDeleted: false,
    })
      .populate({
        path: "trip",
        match: {
          isDeleted: false,
        },
        populate: [
          {
            path: "tourId",
            select: "title city country price duration images",
          },
          {
            path: "guideId",
            select: "name email phone profileImage",
          },
        ],
      })
      .lean();
  }

  return [];
};

export const GuideService = {
  getGuides,
  getGuide,
  createGuide,
  updateGuide,
  deleteGuide,
  getActiveTours,
};
