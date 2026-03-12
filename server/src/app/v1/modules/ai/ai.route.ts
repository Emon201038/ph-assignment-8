import express from "express";
import { AiController } from "./ai.controller";

const aiRoutes = express.Router();

aiRoutes.post("/get-tour-suggestion", AiController.tripPlanner);

export default aiRoutes;
