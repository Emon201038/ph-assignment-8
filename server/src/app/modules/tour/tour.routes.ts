import { Router } from "express";
import { TourValidation } from "./tour.validation";
import { TourController } from "./tour.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { uploadImage } from "../../middlewares/uploadFile";

const tourRouter = Router();

tourRouter
  .route("/")
  .get(TourController.getAllTours)
  .post(
    checkAuth(UserRole.ADMIN, UserRole.GUIDE),
    uploadImage.array("images", 3),
    validateRequest(TourValidation.create),
    TourController.createTour
  );

tourRouter
  .route("/:id")
  .get(TourController.getSingleTour)
  .patch(validateRequest(TourValidation.update), TourController.updateTour)
  .delete(TourController.deleteTour);

export default tourRouter;
