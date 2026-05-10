import express from "express";
import { TripController } from "./trip.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { createTripSchema } from "./trip.validation";
import { checkAuth } from "../../../middlewares/checkAuth";
import { UserRole } from "../../../../../prisma/generated/enums";

const tripRoutes = express.Router();

tripRoutes
  .route("/includes")
  .get(TripController.getTripInclude)
  .post(checkAuth("ADMIN"), (req, res) => {
    res.status(501).json({ message: "Not yet implemented" });
  });

tripRoutes
  .route("/")
  .get(TripController.getAllTrips)
  .post(
    checkAuth("ADMIN", "GUIDE"),
    validateRequest(createTripSchema),
    TripController.createTrip,
  );

tripRoutes
  .route("/:id")
  .get(TripController.getSingleTrip)
  .put(
    checkAuth(UserRole.ADMIN),
    validateRequest(createTripSchema),
    TripController.updateTrip,
  )
  .delete(checkAuth(UserRole.ADMIN), TripController.softDeleteTrip);

export default tripRoutes;
