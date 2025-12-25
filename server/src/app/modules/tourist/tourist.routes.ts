import { uploadImage } from "./../../middlewares/uploadFile";
import express from "express";
import { TouristController } from "./tourist.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { touristSchema } from "./tourist.validation";

const touristRouter = express.Router();

touristRouter
  .route("/")
  .get(TouristController.getTourists)
  .post(
    uploadImage.single("image"),
    validateRequest(touristSchema),
    TouristController.createTourist
  );

touristRouter
  .route("/:id")
  .get(TouristController.getTouristById)
  .put(TouristController.updateTourist)
  .delete(TouristController.deleteTourist);

export default touristRouter;
