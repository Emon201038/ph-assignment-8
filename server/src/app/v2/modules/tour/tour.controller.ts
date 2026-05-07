import { paginationHelper } from "../../../helpers/paginationHelper";
import { pick } from "../../../helpers/pick";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { TourService } from "./tour.service";
import { ToggleTourGuideInput } from "./tour.validation";

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
    data: await TourService.getSingleTour(
      req.params.id,
      req?.query?.isSlug === "true",
    ),
  });
});

const createTour = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const image = req.file as Express.Multer.File;
  const data = await TourService.createTourInDB(req.body, userId, image);

  sendResponse(res, {
    message: "Tour created successfully",
    statusCode: 201,
    success: true,
    data,
  });
});

const deleteTour = catchAsync(async (req, res, next) => {
  const data = await TourService.deleteTour(req.params.id);
  sendResponse(res, {
    message: "Tour deleted successfully",
    statusCode: 200,
    success: true,
    data,
  });
});

const updateTour = catchAsync(async (req, res, next) => {
  const data = await TourService.updateTourInDB(
    req.params.id,
    req.body,
    req.file,
  );
  sendResponse(res, {
    message: "Tour updated successfully",
    statusCode: 200,
    success: true,
    data,
  });
});

const getGuides = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Guides fetched successfully",
    statusCode: 200,
    success: true,
    data: await TourService.getTourGuides(
      req.params.id as string,
      req.query?.searchTerm as string,
    ),
  });
});

const toggleTourGuide = catchAsync(async (req, res, next) => {
  const { guideId } = req.body as ToggleTourGuideInput;
  const { message, data } = await TourService.toggleTourGuide(
    req.params.id,
    guideId,
  );
  sendResponse(res, {
    message,
    statusCode: 200,
    success: true,
    data,
  });
});

export const TourController = {
  getAllTours,
  getSingleTour,
  createTour,
  deleteTour,
  updateTour,
  getGuides,
  toggleTourGuide,
};
