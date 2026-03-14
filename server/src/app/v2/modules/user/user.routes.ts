import express from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { createUserSchema } from "./user.validation";
import { checkAuth } from "../../../middlewares/checkAuth";

const userRoutes = express.Router();

userRoutes
  .route("/")
  .get(UserController.getAllUsers)
  .post(validateRequest(createUserSchema), UserController.createUser);

userRoutes.route("/:id").get(UserController.getSingleUser);
// .put(checkAuth("ADMIN", "TRAVELER", "GUIDE"), validateRequest(createUserSchema), UserController.updateUser)
// .delete(checkAuth("ADMIN"), UserController.deleteUser);

export default userRoutes;
