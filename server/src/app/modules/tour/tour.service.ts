import { Request } from "express";
import AppError from "../../helpers/appError";
import Tour from "./tour.model";
import { uploadFilesToCloudinary } from "../../utils/upload-files";
import { QueryBuilder } from "../../lib/queryBuilder";
import { DynamicQueryBuilder } from "../../lib/queryBuilderByPipline";

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

const getAllTours = async (query: Record<string, string>) => {
  const builder = new QueryBuilder(Tour, query);
  const res = await builder
    .filter()
    .search(["title", "description"])
    .paginate()
    .sort()
    .execWithMeta();

  return res;
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
