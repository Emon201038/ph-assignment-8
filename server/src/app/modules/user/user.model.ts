import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["TOURIST", "GUIDE", "ADMIN"],
      required: true,
    },

    // Common fields
    profileImage: String,
    bio: String,
    languages: [String],

    // Tourist specific fields
    touristInfo: {
      preferences: [String],
      wishlist: [{ type: Schema.Types.ObjectId, ref: "Tour" }],
    },

    // Guide specific fields
    guideInfo: {
      expertise: [String],
      dailyRate: Number,
      rating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
      verified: { type: Boolean, default: false },

      availability: [
        {
          day: String,
          slots: [String], // e.g ["09:00", "10:00"]
        },
      ],
    },

    // Admin specific fields
    adminInfo: {
      permissions: [String],
    },

    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema);
export default User;
