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
exports.AdminService = void 0;
const appError_1 = __importDefault(require("../../helpers/appError"));
const generate_password_1 = require("../../helpers/generate-password");
const user_model_1 = __importDefault(require("../user/user.model"));
const upload_files_1 = require("../../utils/upload-files");
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const isExists = yield user_model_1.default.findOne({ email: payload.email });
    if (isExists) {
        throw new appError_1.default(409, "User already exist with this email.");
    }
    if (req.file) {
        const uploadRes = yield (0, upload_files_1.uploadFileToCloudinary)(req.file, "local-guide");
        if (!uploadRes)
            throw new appError_1.default(500, "Failed to upload profile image.");
        payload.profileImage = uploadRes === null || uploadRes === void 0 ? void 0 : uploadRes.url;
    }
    const password = (0, generate_password_1.generateStrongPassword)();
    payload.password = password;
    const user = yield user_model_1.default.create(payload);
    return user;
});
const deleteUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_model_1.default.findByIdAndDelete(id);
    if (!user) {
        throw new appError_1.default(404, "User not found.");
    }
    return user;
});
exports.AdminService = { createUser, deleteUser };
