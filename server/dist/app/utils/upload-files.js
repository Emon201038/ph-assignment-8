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
exports.uploadFilesToCloudinary = uploadFilesToCloudinary;
const streamifier_1 = __importDefault(require("streamifier"));
const upload_cloudinary_1 = require("./upload-cloudinary");
function uploadFilesToCloudinary(files, folder) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileArray = Array.isArray(files) ? files : [files];
        // Upload each file with stream
        const uploads = yield Promise.all(fileArray.map((file) => __awaiter(this, void 0, void 0, function* () {
            if (!file)
                return null;
            const { mimetype } = file;
            const resourceType = mimetype.startsWith("video") ? "video" : "image";
            // Stream the buffer directly to Cloudinary
            return (0, upload_cloudinary_1.uploadStreamToCloudinary)(streamifier_1.default.createReadStream(file.buffer), folder, resourceType);
        })));
        const cleanUploads = uploads.filter(Boolean);
        return Array.isArray(files)
            ? cleanUploads
            : cleanUploads
                ? cleanUploads === null || cleanUploads === void 0 ? void 0 : cleanUploads[0]
                : null;
    });
}
