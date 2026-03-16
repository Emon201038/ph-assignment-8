"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const destination_routes_1 = __importDefault(require("../modules/destination/destination.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const tour_routes_1 = __importDefault(require("../modules/tour/tour.routes"));
const trip_routes_1 = __importDefault(require("../modules/trip/trip.routes"));
const review_routes_1 = __importDefault(require("../modules/review/review.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const routerv2 = express_1.default.Router();
const routes = [
    {
        path: "/destinations",
        route: destination_routes_1.default,
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
        path: "/reviews",
        route: review_routes_1.default,
    },
    {
        path: "/auth",
        route: auth_routes_1.default,
    },
];
routes.forEach((route) => {
    routerv2.use(route.path, route.route);
});
exports.default = routerv2;
