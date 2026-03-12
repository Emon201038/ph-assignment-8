import { Router } from "express";
import {
  getCountries,
  getLanguages,
  getCurrencies,
  getBanks,
} from "./lookup.controller";

const lookupRouter = Router();

lookupRouter.get("/countries", getCountries);
lookupRouter.get("/languages", getLanguages);
lookupRouter.get("/currencies", getCurrencies);
lookupRouter.get("/banks", getBanks);

export default lookupRouter;
