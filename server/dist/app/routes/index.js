"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const tour_routes_1 = __importDefault(require("../modules/tour/tour.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const admin_routes_1 = __importDefault(require("../modules/admin/admin.routes"));
const guide_routes_1 = __importDefault(require("../modules/guide/guide.routes"));
// import lookupRouter from "../modules/lookup/lookup.routes";
const tourist_routes_1 = __importDefault(require("../modules/tourist/tourist.routes"));
const review_routes_1 = __importDefault(require("../modules/review/review.routes"));
const trip_routes_1 = __importDefault(require("../modules/trip/trip.routes"));
const payment_routes_1 = require("../modules/payment/payment.routes");
const booking_routes_1 = __importDefault(require("../modules/booking/booking.routes"));
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.default,
    },
    {
        path: "/users",
        route: user_routes_1.default,
    },
    {
        path: "/tours",
        route: tour_routes_1.default,
    },
    {
        path: "/trips",
        route: trip_routes_1.default,
    },
    {
        path: "/admin",
        route: admin_routes_1.default,
    },
    {
        path: "/guides",
        route: guide_routes_1.default,
    },
    {
        path: "/tourists",
        route: tourist_routes_1.default,
    },
    // {
    //   path: "/lookup",
    //   route: lookupRouter,
    // },
    {
        path: "/reviews",
        route: review_routes_1.default,
    },
    {
        path: "/payments",
        route: payment_routes_1.PaymentRoutes,
    },
    {
        path: "/bookings",
        route: booking_routes_1.default,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
