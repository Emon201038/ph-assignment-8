import mongoose from "mongoose";
import AppError from "../../helpers/appError";
import { DynamicQueryBuilder } from "../../lib/queryBuilderByPipline";
import { Guide, GuideSchedule } from "../guide/guide.model";
import { ITrip, TripStatus } from "./trip.interface";
import { Trip } from "./trip.model";
import { QueryBuilder } from "../../lib/queryBuilder";

const getTrips = async () => {
  const data = new QueryBuilder(Trip, {})
    .filter()
    .search([])
    .populate(
      [
        "guideId:name;role;email;profilePhoto",
        "tourId:title;description;images;country;city",
      ],
      {
        guideId: "guide",
        tourId: "tour",
      }
    )
    .sort()
    .paginate()
    .execWithMeta();
  return data;
};

const getTourTrips = async (tourId: string) => {
  const data = new DynamicQueryBuilder(Trip, { tourId })
    .paginate()
    .sort()
    .search([])
    .filter()
    .exec();
  return data;
};

const getSingleTripDetails = async (tripId: string) => {
  const data = await Trip.findById(tripId).populate([
    {
      path: "guideId",
      select: ["name", "email", "phone", "profileImage", "role"],
    },
    {
      path: "tourId",
      select: ["title", "description", "category", "images", "city", "country"],
    },
  ]);
  return data;
};

const createTrip = async (data: Partial<ITrip>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { guideId, startDate, endDate } = data;

    if (!guideId || !startDate || !endDate) {
      throw new AppError(400, "Guide, start date and end date are required");
    }

    /* 1️⃣ Check guide exists */
    const guide = await Guide.findById(guideId).session(session);
    if (!guide) {
      throw new AppError(404, "Guide not found");
    }

    /* 2️⃣ Calculate buffer-aware range */
    const parsedStartDate = new Date(String(startDate));
    const parsedEndDate = new Date(String(endDate));

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      throw new AppError(400, "Invalid startDate or endDate");
    }

    const bufferDays =
      Number.isFinite(guide.bufferDays) && guide.bufferDays > 0
        ? guide.bufferDays
        : 0;

    const bufferedStart = new Date(parsedStartDate);
    bufferedStart.setDate(bufferedStart.getDate() - bufferDays);

    const bufferedEnd = new Date(parsedEndDate);
    bufferedEnd.setDate(bufferedEnd.getDate() + bufferDays);

    /* 3️⃣ Check overlapping trips */
    const conflictingTrip = await Trip.findOne({
      guideId,
      status: { $in: [TripStatus.OPEN, TripStatus.ONGOING] },
      startDate: { $lte: bufferedEnd },
      endDate: { $gte: bufferedStart },
    }).session(session);

    if (conflictingTrip) {
      throw new AppError(
        409,
        "Guide is already assigned to another trip in this date range"
      );
    }

    /* 4️⃣ Check guide schedule (manual unavailability) */
    const guideSchedule = await GuideSchedule.findOne({ guideId }).session(
      session
    );

    if (guideSchedule) {
      const isUnavailable = guideSchedule.unavailableRanges.some((range) => {
        return range.startDate <= bufferedEnd && range.endDate >= bufferedStart;
      });

      if (isUnavailable) {
        throw new AppError(409, "Guide is unavailable during this date range");
      }
    }

    /* 5️⃣ Create Trip */
    const trip = await Trip.create(
      [
        {
          ...data,
          status: TripStatus.UPCOMING,
        },
      ],
      { session }
    );

    /* 6️⃣ Lock guide schedule */
    await GuideSchedule.findOneAndUpdate(
      { guideId },
      {
        $push: {
          unavailableRanges: {
            startDate: bufferedStart,
            endDate: bufferedEnd,
            reason: "Trip assigned",
          },
        },
      },
      { upsert: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return trip[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateTrip = async (tripId: string, data: Partial<ITrip>) => {
  const trip = await Trip.findOneAndUpdate({ _id: tripId }, data, {
    new: true,
  });
  return trip;
};

const softDeleteTrip = async (tripId: string) => {
  const trip = await Trip.findByIdAndUpdate(tripId, { isDeleted: true });
  return trip;
};

const hardDeleteTrip = async (tripId: string) => {
  const trip = await Trip.findByIdAndDelete(tripId);
  return trip;
};

export const TripService = {
  getTrips,
  getTourTrips,
  getSingleTripDetails,
  createTrip,
  updateTrip,
  softDeleteTrip,
  hardDeleteTrip,
};
