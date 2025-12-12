import express, { Router } from "express";
import userRouter from "../modules/user/user.routes";
import tourRoute from "../modules/tour/tour.routes";
import authRouter from "../modules/auth/auth.routes";

const router = express.Router();

const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/tours",
    route: tourRoute,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
