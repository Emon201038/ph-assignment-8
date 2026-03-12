"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const user_interface_1 = require("../v1/modules/user/user.interface");
const user_model_1 = __importDefault(require("../v1/modules/user/user.model"));
const env_1 = require("./env");
const seedAdmin = async () => {
    try {
        const isExistAdmin = await user_model_1.default.find({ role: user_interface_1.UserRole.ADMIN });
        if (isExistAdmin.length > 0) {
            console.log("an admin already exists.");
            return;
        }
        await user_model_1.default.create({
            name: env_1.envVars.ADMIN_NAME,
            email: env_1.envVars.ADMIN_EMAIL,
            password: env_1.envVars.ADMIN_PASSWORD,
            role: user_interface_1.UserRole.ADMIN,
            roleProfileModel: "Admin",
        });
        console.log("admin created.");
    }
    catch (error) {
        console.log(error);
    }
};
exports.seedAdmin = seedAdmin;
