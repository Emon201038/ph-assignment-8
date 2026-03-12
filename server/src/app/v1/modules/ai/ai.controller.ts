import AppError from "../../../helpers/appError";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { generateTrip } from "./ai.service";

const tripPlanner = catchAsync(async (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt) {
    throw new AppError(400, "Prompt is required");
  }

  const trip = await generateTrip(prompt);

  sendResponse(res, {
    message: "Trip fetched successfully",
    statusCode: 200,
    success: true,
    data: {
      ...trip,
    },
  });
});

export const AiController = { tripPlanner };
