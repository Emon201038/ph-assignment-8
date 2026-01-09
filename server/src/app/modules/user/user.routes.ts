import { checkAuth } from "./../../middlewares/checkAuth";
import express from "express";
import { UserController } from "./user.controller";
import { uploadImage } from "../../middlewares/uploadFile";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
const userRouter = express.Router();

userRouter
  .route("/")
  .get(checkAuth("ADMIN"), UserController.getUsers)
  .post(
    uploadImage.single("image"),
    validateRequest(UserValidation.create),
    UserController.createUser
  );

userRouter.get("/find/:email", UserController.getUserByEmail);

userRouter
  .route("/:id")
  .get(UserController.getUserById)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

export default userRouter;
