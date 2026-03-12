"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStreamToCloudinary = void 0;
// utils/cloudinary.ts
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
const uploadStreamToCloudinary = (stream, folder, resourceType = "auto") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.default.uploader.upload_stream({ folder, resource_type: resourceType }, (error, result) => {
            if (error || !result)
                return reject(error);
            resolve({ url: result.secure_url, pub_id: result.public_id });
        });
        stream.pipe(uploadStream);
    });
};
exports.uploadStreamToCloudinary = uploadStreamToCloudinary;
