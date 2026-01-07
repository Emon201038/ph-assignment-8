import { uploadImage } from "./../../middlewares/uploadFile";
import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { GuideController } from "./guide.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { guideSchema } from "./guide.validation";
const guideRouter = express.Router();

guideRouter
  .route("/")
  .get(checkAuth(UserRole.ADMIN, UserRole.GUIDE), GuideController.getGuides)
  .post(
    uploadImage.single("image"),
    validateRequest(guideSchema),
    GuideController.createGuide
  );

guideRouter.get("/tours/:id", GuideController.getGuideTours);

guideRouter
  .route("/:id")
  .get(GuideController.getGuide)
  .put(checkAuth(UserRole.ADMIN, UserRole.GUIDE), GuideController.updateGuide)
  .delete(
    checkAuth(UserRole.ADMIN, UserRole.GUIDE),
    GuideController.deleteGuide
  );

export default guideRouter;
