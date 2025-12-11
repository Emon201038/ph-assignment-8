import express, { Router } from "express";
import userRouter from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: "/users",
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
