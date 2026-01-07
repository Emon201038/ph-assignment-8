import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TourService } from "./tour.service";

export const TourController = {
  createTour: catchAsync(async (req, res) => {
    const result = await TourService.createTour(req);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Tour created successfully",
      data: result,
    });
  }),

  updateTour: catchAsync(async (req, res) => {
    const result = await TourService.updateTour(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Tour updated successfully",
      data: result,
    });
  }),

  getAllTours: catchAsync(async (req, res, next) => {
    const result = await TourService.getAllTours(
      req.query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Tours fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  }),

  getSingleTour: catchAsync(async (req, res) => {
    const result = await TourService.getSingleTour(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Tour details fetched",
      data: result,
    });
  }),

  deleteTour: catchAsync(async (req, res) => {
    const result = await TourService.deleteTour(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Tour deleted successfully",
      data: result,
    });
  }),
};
