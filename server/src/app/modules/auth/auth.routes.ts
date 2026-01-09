import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { loginSchema } from "./auth.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";

const authRouter = Router();

authRouter.post("/login", validateRequest(loginSchema), AuthController.login);
authRouter.get("/me", AuthController.getMe);
authRouter.get("/refresh-token", AuthController.refreshToken);
authRouter.post("/forgot-password", AuthController.forgotPassword);
authRouter.post(
  "/change-password",
  checkAuth(...Object.values(UserRole)),
  AuthController.changePassword
);
authRouter.post("/reset-password", AuthController.resetPassword);

export default authRouter;
