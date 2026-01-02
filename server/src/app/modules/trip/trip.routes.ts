import { validateRequest } from "./../../middlewares/validateRequest";
import express from "express";
import { TripController } from "./trip.controller";
import { tripSchema } from "./trip.validation";

const tripRouter = express.Router();

tripRouter
  .route("/")
  .get(TripController.getAllTrips)
  .post(validateRequest(tripSchema), TripController.createTrip);

tripRouter.route("/tour/:id").get(TripController.getTourTrips);
tripRouter.route("/hard-delete/:id").delete(TripController.hardDeleteTrip);

tripRouter
  .route("/:id")
  .get(TripController.getSingleTripDetails)
  .put(TripController.updateTrip)
  .delete(TripController.softDeleteTrip);

export default tripRouter;
