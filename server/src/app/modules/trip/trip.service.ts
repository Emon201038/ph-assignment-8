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
        "tourId:title;description;images;country;city;category;price",
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
  const data = new QueryBuilder(Trip, { tourId })
    .filter()
    .search([])
    .populate(
      [
        "guideId:name;role;email;profilePhoto",
        "tourId:title;description;images;country;city;category;price",
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

const getSingleTripDetails = async (tripId: string) => {
  const data = await Trip.findById(tripId)
    .populate([
      {
        path: "guideId",
        select: ["name", "email", "phone", "profileImage", "role"],
      },
      {
        path: "tourId",
      },
    ])
    .lean();

  const finalObj = {
    ...data,
    guide: data?.guideId,
    tour: data?.tourId,
  };

  delete finalObj.guideId;
  delete finalObj.tourId;

  return finalObj;
};

const createTrip = async (data: Partial<ITrip>) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { guideId, startDate, duration } = data;

    if (!guideId || !startDate || !duration) {
      throw new AppError(400, "Guide, start date and duration are required");
    }

    /* 1️⃣ Validate duration */
    if (duration < 180 || duration > 10080) {
      throw new AppError(400, "Duration must be between 3 hours and 7 days");
    }

    /* 2️⃣ Check guide exists */
    const guide = await Guide.findOne({ userId: guideId }).session(session);
    if (!guide) {
      throw new AppError(404, "Guide not found");
    }

    /* 3️⃣ Parse startDate */
    const parsedStartDate = new Date(String(startDate));
    if (isNaN(parsedStartDate.getTime())) {
      throw new AppError(400, "Invalid startDate");
    }

    /* 4️⃣ Derive endDate from duration */
    const derivedEndDate = new Date(
      parsedStartDate.getTime() + duration * 60 * 1000
    );

    /* 5️⃣ Apply guide buffer days */
    const bufferDays =
      Number.isFinite(guide.bufferDays) && guide.bufferDays > 0
        ? guide.bufferDays
        : 0;

    const bufferedStart = new Date(parsedStartDate);
    bufferedStart.setDate(bufferedStart.getDate() - bufferDays);

    const bufferedEnd = new Date(derivedEndDate);
    bufferedEnd.setDate(bufferedEnd.getDate() + bufferDays);

    /* 6️⃣ Check overlapping trips */
    const conflictingTrip = await Trip.findOne({
      guideId,
      status: { $in: [TripStatus.UPCOMING, TripStatus.ONGOING] },
      startDate: { $lte: bufferedEnd },
      $expr: {
        $gte: [
          {
            $add: ["$startDate", { $multiply: ["$duration", 60000] }],
          },
          bufferedStart,
        ],
      },
    }).session(session);

    if (conflictingTrip) {
      throw new AppError(
        409,
        "Guide is already assigned to another trip in this date range"
      );
    }

    /* 7️⃣ Check guide manual unavailability */
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

    /* 8️⃣ Create trip */
    const trip = await Trip.create(
      [
        {
          status: TripStatus.UPCOMING,
          ...data, // contains startDate & duration
        },
      ],
      { session }
    );

    /* 9️⃣ Lock guide schedule */
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
