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

const createTourist = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Tourist created successfully",
    statusCode: 201,
    success: true,
    data: await TouristService.createTourist(req.body),
  });
});

export const TouristController = { getTourists, createTourist };
