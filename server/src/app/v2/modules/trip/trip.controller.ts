import { pick } from "../../../helpers/pick";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { TripService } from "./trip.service";
import { paginationHelper } from "../../../helpers/paginationHelper";

const getTripInclude = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, ["searchTerm", "category"]);
  sendResponse(res, {
    message: "Trip includes fetched successfully",
    statusCode: 200,
    success: true,
    data: await TripService.getTripInclude(filters as Record<string, string>),
  });
});

const getAllTrips = catchAsync(async (req, res, next) => {
  const options = pick(req.query, paginationHelper.paginationFields);
  const filters = pick(req.query, [
    "searchTerm",
    "status",
    "tourId",
    "guideId",
    "minPrice",
    "maxPrice",
  ]);

  const data = await TripService.getAllTripsFromDB(
    options as Record<string, string>,
    filters as Record<string, string>,
  );

  sendResponse(res, {
    message: "Trips fetched successfully",
    statusCode: 200,
    success: true,
    meta: data.meta,
    data: data.data,
  });
});

const getSingleTrip = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "Trip fetched successfully",
    statusCode: 200,
    success: true,
    data: await TripService.getSingleTrip(req.params.id),
  });
});

const createTrip = catchAsync(async (req, res, next) => {
  const data = await TripService.createTripInDB(req.body);

  sendResponse(res, {
    message: "Trip created successfully",
    statusCode: 201,
    success: true,
    data,
  });
});

export const TripController = {
  getTripInclude,
  getAllTrips,
  getSingleTrip,
  createTrip,
};
