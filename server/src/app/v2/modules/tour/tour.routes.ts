import express from "express";
import { TourController } from "./tour.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { createTourSchema } from "./tour.validation";
import { checkAuth } from "../../../middlewares/checkAuth";

const tourRoutes = express.Router();

tourRoutes
  .route("/")
  .get(TourController.getAllTours)
  .post(
    checkAuth("ADMIN", "GUIDE"),
    validateRequest(createTourSchema),
    TourController.createTour,
  );

tourRoutes.route("/:id").get(TourController.getSingleTour);
// .put(validateRequest(createTourSchema), TourController.updateTour)
// .delete(TourController.deleteTour);

export default tourRoutes;
