import { paginationHelper } from "../../../helpers/paginationHelper";
import { pick } from "../../../helpers/pick";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { DestinationService } from "./destination.service";

const getAllDestinations = catchAsync(async (req, res, next) => {
  const options = pick(req.query, paginationHelper.paginationFields);
  const filters = pick(req.query, ["searchTerm", "date"]);

  const data = await DestinationService.getDestinationsFromDb(
    options as Record<string, string>,
    filters as Record<string, string>,
  );
  sendResponse(res, {
    message: "Destinations fetched successfully",
    statusCode: 200,
    success: true,
    meta: data.meta,
    data: data.destinations,
  });
});

const getSingleDestination = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Destination fetched successfully",
    statusCode: 200,
    success: true,
    data: await DestinationService.getSingleDestination(req.params.id),
  });
});

const getNearbyDestinations = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Nearby Destinations fetched successfully",
    statusCode: 200,
    success: true,
    data: await DestinationService.getNearbyDestinations(
      Number(req.query.lat),
      Number(req.query.lng),
    ),
  });
});

export const DestinationController = {
  getAllDestinations,
  getSingleDestination,
  getNearbyDestinations,
};
