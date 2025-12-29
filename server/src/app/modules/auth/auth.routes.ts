import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { loginSchema } from "./auth.validation";

const authRouter = Router();

authRouter.post("/login", validateRequest(loginSchema), AuthController.login);
authRouter.get("/me", AuthController.getMe);
authRouter.get("/refresh-token", AuthController.refreshToken);

export default authRouter;
