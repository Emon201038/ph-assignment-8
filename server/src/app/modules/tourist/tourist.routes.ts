import express from "express";
import { TouristController } from "./tourist.controller";

const touristRouter = express.Router();

touristRouter
  .route("/")
  .get(TouristController.getTourists)
  .post(TouristController.createTourist);

export default touristRouter;
