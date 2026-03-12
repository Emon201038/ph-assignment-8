"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./app/config/db");
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
const seed_admin_1 = require("./app/config/seed-admin");
// import { connectRedis } from "./app/config/redis.config";
let server;
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`Server is running on port ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
(async () => {
    // await connectRedis();
    await startServer();
    await (0, seed_admin_1.seedAdmin)();
})();
process.on("unhandledRejection", (error) => {
    if (server) {
        server.close(() => {
            console.error(error);
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on("uncaughtException", (error) => {
    if (server) {
        server.close(() => {
            console.error(error);
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    if (server) {
        server.close();
    }
});
process.on("SIGINT", () => {
    console.log("SIGINT received");
    if (server) {
        server.close();
    }
});
