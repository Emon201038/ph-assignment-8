import express from "express";
import { DestinationController } from "./destination.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { createDestinationSchema } from "./destination.validation";
import { checkAuth } from "../../../middlewares/checkAuth";
import { uploadImage } from "../../../middlewares/uploadFile";

const destinationRoutes = express.Router();

destinationRoutes.route("/").get(DestinationController.getAllDestinations).post(
  uploadImage.single("image"),
  checkAuth("ADMIN", "GUIDE"),
  // validateRequest(createDestinationSchema),
  DestinationController.createDestination,
);

destinationRoutes
  .route("/nearby")
  .get(DestinationController.getNearbyDestinations);

destinationRoutes
  .route("/:id")
  .get(DestinationController.getSingleDestination)
  .put(
    uploadImage.single("image"),
    checkAuth("ADMIN", "GUIDE"),
    validateRequest(createDestinationSchema),
    DestinationController.updateDestination,
  )
  .delete(checkAuth("ADMIN"), DestinationController.deleteDestination);

export default destinationRoutes;
