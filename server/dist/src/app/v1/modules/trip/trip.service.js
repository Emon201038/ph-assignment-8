"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../../helpers/appError"));
const guide_model_1 = require("../guide/guide.model");
const trip_interface_1 = require("./trip.interface");
const trip_model_1 = require("./trip.model");
const queryBuilder_1 = require("../../../lib/queryBuilder");
const getTrips = async () => {
    const data = new queryBuilder_1.QueryBuilder(trip_model_1.Trip, {})
        .filter()
        .search([])
        .populate([
        "guideId:name;role;email;profilePhoto",
        "tourId:title;description;images;country;city;category;price",
    ], {
        guideId: "guide",
        tourId: "tour",
    })
        .sort()
        .paginate()
        .execWithMeta();
    return data;
};
const getTourTrips = async (tourId) => {
    const data = new queryBuilder_1.QueryBuilder(trip_model_1.Trip, { tourId })
        .filter()
        .search([])
        .populate([
        "guideId:name;role;email;profilePhoto",
        "tourId:title;description;images;country;city;category;price",
    ], {
        guideId: "guide",
        tourId: "tour",
    })
        .sort()
        .paginate()
        .execWithMeta();
    return data;
};
const getSingleTripDetails = async (tripId) => {
    const data = await trip_model_1.Trip.findById(tripId)
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
const createTrip = async (data) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { guideId, startDate, duration } = data;
        if (!guideId || !startDate || !duration) {
            throw new appError_1.default(400, "Guide, start date and duration are required");
        }
        /* 1️⃣ Validate duration */
        if (duration < 180 || duration > 10080) {
            throw new appError_1.default(400, "Duration must be between 3 hours and 7 days");
        }
        /* 2️⃣ Check guide exists */
        const guide = await guide_model_1.Guide.findOne({ userId: guideId }).session(session);
        if (!guide) {
            throw new appError_1.default(404, "Guide not found");
        }
        /* 3️⃣ Parse startDate */
        const parsedStartDate = new Date(String(startDate));
        if (isNaN(parsedStartDate.getTime())) {
            throw new appError_1.default(400, "Invalid startDate");
        }
        /* 4️⃣ Derive endDate from duration */
        const derivedEndDate = new Date(parsedStartDate.getTime() + duration * 60 * 1000);
        /* 5️⃣ Apply guide buffer days */
        const bufferDays = Number.isFinite(guide.bufferDays) && guide.bufferDays > 0
            ? guide.bufferDays
            : 0;
        const bufferedStart = new Date(parsedStartDate);
        bufferedStart.setDate(bufferedStart.getDate() - bufferDays);
        const bufferedEnd = new Date(derivedEndDate);
        bufferedEnd.setDate(bufferedEnd.getDate() + bufferDays);
        /* 6️⃣ Check overlapping trips */
        const conflictingTrip = await trip_model_1.Trip.findOne({
            guideId,
            status: { $in: [trip_interface_1.TripStatus.UPCOMING, trip_interface_1.TripStatus.ONGOING] },
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
            throw new appError_1.default(409, "Guide is already assigned to another trip in this date range");
        }
        /* 7️⃣ Check guide manual unavailability */
        const guideSchedule = await guide_model_1.GuideSchedule.findOne({ guideId }).session(session);
        if (guideSchedule) {
            const isUnavailable = guideSchedule.unavailableRanges.some((range) => {
                return range.startDate <= bufferedEnd && range.endDate >= bufferedStart;
            });
            if (isUnavailable) {
                throw new appError_1.default(409, "Guide is unavailable during this date range");
            }
        }
        /* 8️⃣ Create trip */
        const trip = await trip_model_1.Trip.create([
            {
                status: trip_interface_1.TripStatus.UPCOMING,
                ...data, // contains startDate & duration
            },
        ], { session });
        /* 9️⃣ Lock guide schedule */
        await guide_model_1.GuideSchedule.findOneAndUpdate({ guideId }, {
            $push: {
                unavailableRanges: {
                    startDate: bufferedStart,
                    endDate: bufferedEnd,
                    reason: "Trip assigned",
                },
            },
        }, { upsert: true, session });
        await session.commitTransaction();
        session.endSession();
        return trip[0];
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const updateTrip = async (tripId, data) => {
    const trip = await trip_model_1.Trip.findOneAndUpdate({ _id: tripId }, data, {
        new: true,
    });
    return trip;
};
const softDeleteTrip = async (tripId) => {
    const trip = await trip_model_1.Trip.findByIdAndUpdate(tripId, { isDeleted: true });
    return trip;
};
const hardDeleteTrip = async (tripId) => {
    const trip = await trip_model_1.Trip.findByIdAndDelete(tripId);
    return trip;
};
exports.TripService = {
    getTrips,
    getTourTrips,
    getSingleTripDetails,
    createTrip,
    updateTrip,
    softDeleteTrip,
    hardDeleteTrip,
};
