"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const user_interface_1 = require("../modules/user/user.interface");
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const env_1 = require("./env");
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExistAdmin = yield user_model_1.default.find({ role: user_interface_1.UserRole.ADMIN });
        if (isExistAdmin.length > 0) {
            console.log("an admin already exists.");
            return;
        }
        yield user_model_1.default.create({
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
});
exports.seedAdmin = seedAdmin;
