import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser, UserRole } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "User name is required"] },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      set: function (v: string) {
        return bcrypt.hashSync(v, 12);
      },
    },

    role: {
      type: String,
      enum: ["TOURIST", "GUIDE", "ADMIN"],
      default: UserRole.TOURIST,
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
