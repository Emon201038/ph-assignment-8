import express from "express";
import { TourController } from "./tour.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { createTourSchema, toggleTourGuideSchema } from "./tour.validation";
import { checkAuth } from "../../../middlewares/checkAuth";
import { uploadImage } from "../../../middlewares/uploadFile";

const tourRoutes = express.Router();

tourRoutes
  .route("/")
  .get(TourController.getAllTours)
  .post(
    uploadImage.single("image"),
    checkAuth("ADMIN", "GUIDE"),
    validateRequest(createTourSchema),
    TourController.createTour,
  );

tourRoutes
  .route("/:id")
  .get(TourController.getSingleTour)
  .put(
    uploadImage.single("image"),
    checkAuth("ADMIN", "GUIDE"),
    validateRequest(createTourSchema),
    TourController.updateTour,
  )
  .delete(TourController.deleteTour);

tourRoutes
  .route("/:id/guides")
  .get(TourController.getGuides)
  .post(
    checkAuth("ADMIN", "GUIDE"),
    validateRequest(toggleTourGuideSchema),
    TourController.toggleTourGuide,
  );

export default tourRoutes;
