import { Router } from "express";
import { TourValidation } from "./tour.validation";
import { TourController } from "./tour.controller";
import { validateRequest } from "../../middlewares/validateRequest";

const tourRoute = Router();

tourRoute
  .route("/")
  .get(TourController.getAllTours)
  .post(validateRequest(TourValidation.create), TourController.createTour);

tourRoute
  .route("/:id")
  .get(TourController.getSingleTour)
  .patch(validateRequest(TourValidation.update), TourController.updateTour)
  .delete(TourController.deleteTour);

export default tourRoute;
