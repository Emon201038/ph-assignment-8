import express from "express";
import destinationRoutes from "../modules/destination/destination.routes";

const routerv2 = express.Router();

const routes: { path: string; route: express.Router }[] = [
  {
    path: "/destinations",
    route: destinationRoutes,
  },
];

routes.forEach((route) => {
  routerv2.use(route.path, route.route);
});

export default routerv2;
