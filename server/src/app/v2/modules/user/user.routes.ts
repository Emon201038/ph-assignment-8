import express from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { createUserSchema, updateUserSchema } from "./user.validation";
import { checkAuth } from "../../../middlewares/checkAuth";
import { uploadImage } from "../../../middlewares/uploadFile";

const userRoutes = express.Router();

userRoutes
  .route("/")
  .get(UserController.getAllUsers)
  .post(validateRequest(createUserSchema), UserController.createUser);

userRoutes
  .route("/:id")
  .get(UserController.getSingleUser)
  .put(
    uploadImage.fields([
      {
        name: "avatar",
        maxCount: 1,
      },
      {
        name: "banner",
        maxCount: 1,
      },
    ]),
    checkAuth("ADMIN", "TRAVELER", "GUIDE"),
    validateRequest(updateUserSchema),
    UserController.updateUser,
  )
  .delete(
    checkAuth("ADMIN", "TRAVELER", "GUIDE"),
    UserController.hardDeleteUser,
  );

userRoutes.delete("/soft-delete/:id", UserController.softDeleteUser);

userRoutes
  .route("/emergency-contacts/:id")
  .post(UserController.addEmergencyContact)
  .get(UserController.getEmergencyContact)
  .put(UserController.updateEmergencyContact)
  .delete(UserController.removeEmergencyContact);

export default userRoutes;
