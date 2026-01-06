import { z } from "zod";

export const createReviewSchema = z.object({
  body: z.object({
    targetId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid target id"),

    targetType: z.enum(["Tour", "User"]),

    rating: z.number().min(1).max(5),

    comment: z.string().optional(),
  }),
});
