"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnv = () => {
    const requiredEnv = [
        "PORT",
        "APP_NAME",
        "DB_URI",
        "NODE_ENV",
        "JWT_ACCESS_TOKEN_SECRET",
        "JWT_ACCESS_TOKEN_EXPIRES_IN",
        "JWT_REFRESH_TOKEN_SECRET",
        "JWT_REFRESH_TOKEN_EXPIRES_IN",
        "JWT_RESET_PASSWORD_TOKEN_SECRET",
        "JWT_RESET_PASSWORD_TOKEN_EXPIRES_IN",
        "CLIENT_URL",
        "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_API_KEY",
        "CLOUDINARY_API_SECRET",
        "ADMIN_NAME",
        "ADMIN_EMAIL",
        "ADMIN_PASSWORD",
        // "EXPRESS_SESSION_SECRET",
        // "GOOGLE_CLIENT_ID",
        // "GOOGLE_CLIENT_SECRET",
        // "GOOGLE_CALLBACK_URL",
        // "SALT_ROUNDS",
        // "SMTP_HOST",
        // "SMTP_PORT",
        // "SMTP_USER",
        // "SMTP_FROM",
        // "SMTP_PASSWORD",
        // "REDIS_USERNAME",
        // "REDIS_PASSWORD",
        // "REDIS_HOST",
        // "REDIS_PORT",
        "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET",
    ];
    requiredEnv.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable: ${envVar}`);
        }
    });
    return {
        PORT: process.env.PORT,
        APP_NAME: process.env.APP_NAME,
        DB_URI: process.env.DB_URI,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
        JWT_ACCESS_TOKEN_EXPIRES_IN: process.env
            .JWT_ACCESS_TOKEN_EXPIRES_IN,
        JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
        JWT_REFRESH_TOKEN_EXPIRES_IN: process.env
            .JWT_REFRESH_TOKEN_EXPIRES_IN,
        JWT_RESET_PASSWORD_TOKEN_SECRET: process.env
            .JWT_RESET_PASSWORD_TOKEN_SECRET,
        JWT_RESET_PASSWORD_TOKEN_EXPIRES_IN: process.env
            .JWT_RESET_PASSWORD_TOKEN_EXPIRES_IN,
        CLIENT_URL: process.env.CLIENT_URL,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        ADMIN_NAME: process.env.ADMIN_NAME,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        // GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        // EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        // SALT_ROUNDS: process.env.SALT_ROUNDS as string,
        // SMTP_HOST: process.env.SMTP_HOST as string,
        // SMTP_PORT: process.env.SMTP_PORT as string,
        // SMTP_USER: process.env.SMTP_USER as string,
        // SMTP_FROM: process.env.SMTP_FROM as string,
        // SMTP_PASSWORD: process.env.SMTP_PASSWORD as string,
        // REDIS_USERNAME: process.env.REDIS_USERNAME as string,
        // REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
        // REDIS_HOST: process.env.REDIS_HOST as string,
        // REDIS_PORT: process.env.REDIS_PORT as string,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    };
};
exports.envVars = loadEnv();
