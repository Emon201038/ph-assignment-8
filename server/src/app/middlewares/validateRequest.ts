import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import AppError from "../helpers/appError";

export const validateRequest =
  (zodSchema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const key in req.body) {
        if (req.body[key] === "true") {
          req.body[key] = true;
        }
        if (req.body[key] === "false") {
          req.body[key] = false;
        }
      }
      if (!req.body) throw new AppError(400, "Request body is empty.");
      if (req.body.body) req.body.body = JSON.parse(req.body.body);
      req.body = await zodSchema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
