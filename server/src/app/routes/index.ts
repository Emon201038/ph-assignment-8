import express, { Router } from "express";

const router = express.Router();

const moduleRoutes: { path: string; route: Router }[] = [];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
