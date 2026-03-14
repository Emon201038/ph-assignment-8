import express from "express";
import { DestinationController } from "./destination.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { createDestinationSchema } from "./destination.validation";

const destinationRoutes = express.Router();

destinationRoutes
  .route("/")
  .get(DestinationController.getAllDestinations)
  .post(validateRequest(createDestinationSchema), (req, res) => {
    // POST route for creating destinations
    res.status(501).json({ message: "Not yet implemented" });
  });

destinationRoutes
  .route("/nearby")
  .get(DestinationController.getNearbyDestinations);

destinationRoutes.route("/:id").get(DestinationController.getSingleDestination);
// .put(validateRequest(createDestinationSchema), DestinationController.updateDestination)
// .delete(DestinationController.deleteDestination);

export default destinationRoutes;
