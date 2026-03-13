import { paginationHelper } from "../../../helpers/paginationHelper";
import { pick } from "../../../helpers/pick";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { TourService } from "./tour.service";

const getAllTours = catchAsync(async (req, res, next) => {
  const options = pick(req.query, paginationHelper.paginationFields);
  const filters = pick(req.query, [
    "searchTerm",
    "category",
    "country",
    "city",
    "minPrice",
    "maxPrice",
    "language",
  ]);

  const data = await TourService.getAllTourFromDB(
    options as Record<string, string>,
    filters as Record<string, string>,
  );
  sendResponse(res, {
    message: "Tours fetched successfully",
    statusCode: 200,
    success: true,
    meta: data.meta,
    data: data.data,
  });
});

const getSingleTour = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Tour fetched successfully",
    statusCode: 200,
    success: true,
    data: await TourService.getSingleTour(req.params.id),
  });
});

export const TourController = { getAllTours, getSingleTour };
