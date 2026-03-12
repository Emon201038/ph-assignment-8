"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const client_1 = require("../../../prisma/generated/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(env_1.envVars.DB_URI);
        console.log("DB connected with this URI:", env_1.envVars.DB_URI);
    }
    catch (error) {
        console.log("DB connection failed");
        console.log(error);
    }
};
exports.connectDB = connectDB;
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new client_1.PrismaClient({ adapter });
exports.default = prisma;
