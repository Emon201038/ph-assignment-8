import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import AppError from "../helpers/appError";
import { HTTP_STATUS } from "../utils/httpStatus";
import { verifyJwt } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...roles: string[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    console.log(accessToken, req.cookies);
    if (!accessToken) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, "You are not logged in.");
    }

    const decoded = verifyJwt(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;
    if (!decoded) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, "You are not logged in.");
    }

    if (!roles.includes(decoded.role)) {
      throw new AppError(
        HTTP_STATUS.UNAUTHORIZED,
        "You are not authorized to access this route."
      );
    }

    req.user = decoded;
    next();
  });
