import express from "express";
import destinationRoutes from "../modules/destination/destination.routes";
import userRoutes from "../modules/user/user.routes";
import tourRoutes from "../modules/tour/tour.routes";
import tripRoutes from "../modules/trip/trip.routes";
import reviewRoutes from "../modules/review/review.routes";
import authRouter from "../modules/auth/auth.routes";

const routerv2 = express.Router();

const routes: { path: string; route: express.Router }[] = [
  {
    path: "/destinations",
    route: destinationRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/tours",
    route: tourRoutes,
  },
  {
    path: "/trips",
    route: tripRoutes,
  },
  {
    path: "/reviews",
    route: reviewRoutes,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

routes.forEach((route) => {
  routerv2.use(route.path, route.route);
});

export default routerv2;
