import { Request } from "express";
import AppError from "../../helpers/appError";
import { QueryBuilder } from "../../middlewares/queryBuilder";
import Tour from "./tour.model";
import { uploadFilesToCloudinary } from "../../utils/upload-files";

export const TourService = {
  async createTour(req: Request) {
    const payload = req.body;
    if (req.file) {
      const res = await uploadFilesToCloudinary(
        req.file as Express.Multer.File,
        "local-guide"
      );

      payload.images = Array.isArray(res) ? res?.map((i) => i?.url) : res?.url;
    }
    return await Tour.create(payload);
  },

  async updateTour(id: string, payload: any) {
    const result = await Tour.findByIdAndUpdate(id, payload, { new: true });
    if (!result) throw new AppError(404, "Tour not found");
    return result;
  },

  async getAllTours(query: any) {
    const builder = new QueryBuilder<typeof Tour.prototype>(Tour, query);
    const res = await builder
      .filter()
      .search(["title", "description", "tag"])
      .paginate()
      .execWithMeta();

    return { tours: res.data, meta: res.meta };
  },

  async getSingleTour(id: string) {
    const tour = await Tour.findById(id).populate("guide");
    if (!tour) throw new AppError(404, "Tour not found");
    return tour;
  },

  async deleteTour(id: string) {
    const tour = await Tour.findByIdAndDelete(id);
    if (!tour) throw new AppError(404, "Tour not found");
    return tour;
  },
};
