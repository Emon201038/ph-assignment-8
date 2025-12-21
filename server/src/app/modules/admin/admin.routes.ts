import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { AdminController } from "./admin.controller";

const adminRouter = express.Router();

adminRouter.post(
  "/create-user",
  checkAuth(UserRole.ADMIN),
  AdminController.createUser
);

// hard delete
adminRouter.delete(
  "/delete-user/:id",
  checkAuth(UserRole.ADMIN),
  AdminController.deleteUser
);

export default adminRouter;
