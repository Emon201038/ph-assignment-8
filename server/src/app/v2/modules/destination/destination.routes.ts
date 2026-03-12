import express from "express";
import { DestinationController } from "./destination.controller";

const destinationRoutes = express.Router();

destinationRoutes.route("/").get(DestinationController.getAllDestinations);

destinationRoutes
  .route("/nearby")
  .get(DestinationController.getNearbyDestinations);

destinationRoutes.route("/:id").get(DestinationController.getSingleDestination);
// .put(DestinationController.updateDestination)
// .delete(DestinationController.deleteDestination);

export default destinationRoutes;
