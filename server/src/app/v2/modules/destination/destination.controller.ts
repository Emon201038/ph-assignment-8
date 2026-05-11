import { paginationHelper } from "../../../helpers/paginationHelper";
import { pick } from "../../../helpers/pick";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { DestinationService } from "./destination.service";
import { CreateDestinationInput } from "./destination.validation";

const getAllDestinations = catchAsync(async (req, res, next) => {
  const options = pick(req.query, paginationHelper.paginationFields);
  const filters = pick(req.query, ["searchTerm", "date", "popular"]);

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

const createDestination = catchAsync(async (req, res, next) => {
  const image = req.file as Express.Multer.File;
  const data = await DestinationService.createDestinationInDB(
    req.body as CreateDestinationInput,
    image,
  );

  sendResponse(res, {
    message: "Destination created successfully",
    statusCode: 201,
    success: true,
    data,
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

const updateDestination = catchAsync(async (req, res, next) => {
  const data = await DestinationService.updateDestinationInDB(
    req.params.id,
    req.body as CreateDestinationInput,
    req.file as Express.Multer.File | undefined,
  );

  sendResponse(res, {
    message: "Destination updated successfully",
    statusCode: 200,
    success: true,
    data,
  });
});

const deleteDestination = catchAsync(async (req, res, next) => {
  const data = await DestinationService.softDeleteDestinationInDB(
    req.params.id,
  );

  sendResponse(res, {
    message: "Destination deleted successfully",
    statusCode: 200,
    success: true,
    data,
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
  createDestination,
  getSingleDestination,
  updateDestination,
  deleteDestination,
  getNearbyDestinations,
};
