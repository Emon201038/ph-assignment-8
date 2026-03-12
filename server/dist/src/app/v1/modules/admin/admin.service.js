"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const appError_1 = __importDefault(require("../../../helpers/appError"));
const generate_password_1 = require("../../../helpers/generate-password");
const user_model_1 = __importDefault(require("../user/user.model"));
const upload_files_1 = require("../../../utils/upload-files");
const createUser = async (req) => {
    const payload = req.body;
    const isExists = await user_model_1.default.findOne({ email: payload.email });
    if (isExists) {
        throw new appError_1.default(409, "User already exist with this email.");
    }
    if (req.file) {
        const uploadRes = await (0, upload_files_1.uploadFileToCloudinary)(req.file, "local-guide");
        if (!uploadRes)
            throw new appError_1.default(500, "Failed to upload profile image.");
        payload.profileImage = uploadRes?.url;
    }
    const password = (0, generate_password_1.generateStrongPassword)();
    payload.password = password;
    const user = await user_model_1.default.create(payload);
    return user;
};
const deleteUser = async (req) => {
    const { id } = req.params;
    const user = await user_model_1.default.findByIdAndDelete(id);
    if (!user) {
        throw new appError_1.default(404, "User not found.");
    }
    return user;
};
exports.AdminService = { createUser, deleteUser };
