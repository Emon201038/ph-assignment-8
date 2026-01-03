import { Request } from "express";
import AppError from "../../helpers/appError";
import Tour from "./tour.model";
import { uploadFilesToCloudinary } from "../../utils/upload-files";
import { QueryBuilder } from "../../lib/queryBuilder";

const createTour = async (req: Request) => {
  const payload = req.body;
  if (req.files) {
    const res = await uploadFilesToCloudinary(
      req.files as Express.Multer.File[],
      "local-guide"
    );

    payload.images = Array.isArray(res) ? res?.map((i) => i?.url) : res?.url;
  }

  payload.createdBy = req.user.userId;

  return await Tour.create(payload);
};

const updateTour = async (id: string, payload: any) => {
  const result = await Tour.findByIdAndUpdate(id, payload.body, { new: true });
  if (!result) throw new AppError(404, "Tour not found");
  return result;
};

const getAllTours = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = query.searchTerm;

  const matchStage: any = {};

  if (searchTerm) {
    const words = searchTerm.trim().split(/\s+/);
    matchStage.$and = words.map((w: string) => ({
      $or: [{ title: new RegExp(w, "i") }, { description: new RegExp(w, "i") }],
    }));
  }

  const pipeline: any[] = [
    { $match: matchStage },
    {
      $lookup: {
        from: "trips",
        localField: "_id",
        foreignField: "tourId",
        as: "trips",
      },
    },

    {
      $addFields: {
        totalTrips: { $size: "$trips" },
        totalReviews: { $sum: "$trips.totalReviews" },
        averageRating: {
          $cond: [
            { $gt: [{ $sum: "$trips.totalReviews" }, 0] },
            {
              $divide: [
                {
                  $sum: {
                    $map: {
                      input: "$trips",
                      as: "t",
                      in: { $multiply: ["$$t.rating", "$$t.totalReviews"] },
                    },
                  },
                },
                { $sum: "$trips.totalReviews" },
              ],
            },
            0,
          ],
        },
      },
    },

    { $project: { trips: 0 } },

    { $sort: { createdAt: -1 } },

    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        total: [{ $count: "count" }],
      },
    },
  ];

  const result = await Tour.aggregate(pipeline);

  const tours = result[0].data;
  const total = result[0].total[0]?.count || 0;

  return {
    tours,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSingleTour = async (id: string) => {
  const tour = await Tour.findById(id);
  if (!tour) throw new AppError(404, "Tour not found");
  return tour;
};

const deleteTour = async (id: string) => {
  const tour = await Tour.findByIdAndDelete(id);
  if (!tour) throw new AppError(404, "Tour not found");
  return tour;
};

export const TourService = {
  createTour,
  updateTour,
  getAllTours,
  getSingleTour,
  deleteTour,
};
