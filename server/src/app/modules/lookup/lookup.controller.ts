import { Request, Response } from "express";
import LookupService from "./lookup.service";
import { sendResponse } from "../../utils/sendResponse";

export const getCountries = (req: Request, res: Response) => {
  const { search } = req.query;

  const data = LookupService.searchCountries(search as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Countries fetched successfully",
    data,
  });
};

export const getLanguages = (req: Request, res: Response) => {
  const { search } = req.query;

  const data = LookupService.searchLanguages(search as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Languages fetched successfully",
    data,
  });
};

export const getCurrencies = (req: Request, res: Response) => {
  const { search } = req.query;

  const data = LookupService.searchCurrencies(search as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Currencies fetched successfully",
    data,
  });
};

export const getBanks = (req: Request, res: Response) => {
  const { country, search } = req.query;

  const data = LookupService.searchBanks(country as string, search as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Banks fetched successfully",
    data,
  });
};
