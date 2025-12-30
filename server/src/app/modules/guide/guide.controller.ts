import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { GuideService } from "./guide.service";

const getGuides = catchAsync(async (req, res, next) => {
  const data = await GuideService.getGuides(
    req.query as Record<string, string>
  );
  sendResponse(res, {
    message: "Guides fetched successfully",
    statusCode: 200,
    success: true,
    data: data.guides,
    meta: data.meta,
  });
});

const getGuide = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Guide fetched successfully",
    statusCode: 200,
    success: true,
    data: await GuideService.getGuide(req.params.id),
  });
});

const createGuide = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Guide created successfully",
    statusCode: 201,
    success: true,
    data: await GuideService.createGuide(req),
  });
});

const updateGuide = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Guide updated successfully",
    statusCode: 200,
    success: true,
    data: await GuideService.updateGuide(req),
  });
});

const deleteGuide = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Guide deleted successfully",
    statusCode: 200,
    success: true,
    data: await GuideService.deleteGuide(req.params.id),
  });
});

export const GuideController = {
  getGuides,
  getGuide,
  createGuide,
  updateGuide,
  deleteGuide,
};
