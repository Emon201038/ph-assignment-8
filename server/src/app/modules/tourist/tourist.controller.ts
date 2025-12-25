import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TouristService } from "./tourist.service";

const getTourists = catchAsync(async (req, res, next) => {
  const data = await TouristService.getTourists(
    req.query as Record<string, string>
  );
  sendResponse(res, {
    message: "Tourists fetched successfully",
    statusCode: 200,
    success: true,
    data: data.tourists,
    meta: data.meta,
  });
});

const getTouristById = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Tourist fetched successfully",
    statusCode: 200,
    success: true,
    data: await TouristService.getTouristById(req.params.id),
  });
});

const createTourist = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Tourist created successfully",
    statusCode: 201,
    success: true,
    data: await TouristService.createTourist(req),
  });
});

const updateTourist = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Tourist updated successfully",
    statusCode: 200,
    success: true,
    data: await TouristService.updateTourist(req.params.id, req.body),
  });
});

const deleteTourist = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Tourist deleted successfully",
    statusCode: 200,
    success: true,
    data: await TouristService.deleteTourist(req.params.id),
  });
});

export const TouristController = {
  getTourists,
  getTouristById,
  createTourist,
  updateTourist,
  deleteTourist,
};
