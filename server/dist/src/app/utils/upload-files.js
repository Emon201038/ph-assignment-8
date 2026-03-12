"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFilesToCloudinary = uploadFilesToCloudinary;
exports.uploadFileToCloudinary = uploadFileToCloudinary;
const streamifier_1 = __importDefault(require("streamifier"));
const upload_cloudinary_1 = require("./upload-cloudinary");
async function uploadFilesToCloudinary(files, folder) {
    const fileArray = Array.isArray(files) ? files : [files];
    // Upload each file with stream
    const uploads = await Promise.all(fileArray.map(async (file) => {
        if (!file)
            return null;
        const { mimetype } = file;
        const resourceType = mimetype.startsWith("video") ? "video" : "image";
        // Stream the buffer directly to Cloudinary
        return (0, upload_cloudinary_1.uploadStreamToCloudinary)(streamifier_1.default.createReadStream(file.buffer), folder, resourceType);
    }));
    const cleanUploads = uploads.filter(Boolean);
    return Array.isArray(files)
        ? cleanUploads
        : cleanUploads
            ? cleanUploads?.[0]
            : null;
}
async function uploadFileToCloudinary(file, folder) {
    // Upload each file with stream
    if (!file)
        return null;
    const { mimetype } = file;
    const resourceType = mimetype.startsWith("video") ? "video" : "image";
    // Stream the buffer directly to Cloudinary
    return (0, upload_cloudinary_1.uploadStreamToCloudinary)(streamifier_1.default.createReadStream(file.buffer), folder, resourceType);
}
