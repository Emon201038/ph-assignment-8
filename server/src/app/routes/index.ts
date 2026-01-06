import express, { Router } from "express";
import userRouter from "../modules/user/user.routes";
import tourRouter from "../modules/tour/tour.routes";
import authRouter from "../modules/auth/auth.routes";
import adminRouter from "../modules/admin/admin.routes";
import guideRouter from "../modules/guide/guide.routes";
// import lookupRouter from "../modules/lookup/lookup.routes";
import touristRouter from "../modules/tourist/tourist.routes";
import tripRouter from "../modules/trip/trip.routes";
import { PaymentRoutes } from "../modules/payment/payment.routes";
import bookingRouter from "../modules/booking/booking.routes";
import reviewRouter from "../modules/review/review.routes";

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
    route: tourRouter,
  },
  {
    path: "/trips",
    route: tripRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
  {
    path: "/guides",
    route: guideRouter,
  },
  {
    path: "/tourists",
    route: touristRouter,
  },
  // {
  //   path: "/lookup",
  //   route: lookupRouter,
  // },
  {
    path: "/reviews",
    route: reviewRouter,
  },
  {
    path: "/payments",
    route: PaymentRoutes,
  },
  {
    path: "/bookings",
    route: bookingRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
