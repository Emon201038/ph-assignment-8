import { uploadImage } from "./../../middlewares/uploadFile";
import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { GuideController } from "./guide.controller";
const guideRouter = express.Router();

guideRouter
  .route("/")
  .get(checkAuth(UserRole.ADMIN, UserRole.GUIDE), GuideController.getGuides)
  .post(uploadImage.single("image"), GuideController.createGuide);

guideRouter
  .route("/:id")
  .get(GuideController.getGuide)
  .put(checkAuth(UserRole.ADMIN, UserRole.GUIDE), GuideController.updateGuide)
  .delete(
    checkAuth(UserRole.ADMIN, UserRole.GUIDE),
    GuideController.deleteGuide
  );

export default guideRouter;
