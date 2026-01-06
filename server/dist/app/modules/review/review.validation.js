"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewSchema = void 0;
const zod_1 = require("zod");
exports.createReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        targetId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid target id"),
        targetType: zod_1.z.enum(["Tour", "User"]),
        rating: zod_1.z.number().min(1).max(5),
        comment: zod_1.z.string().optional(),
    }),
});
