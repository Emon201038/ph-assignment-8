import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { Gender, IUser, UserRole } from "./user.interface";

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
    address: String,
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.MALE,
    },
    phone: String,

    profile: {
      type: Schema.Types.ObjectId,
      refPath: "roleProfileModel",
    },

    roleProfileModel: {
      type: String,
      required: true,
      enum: ["Tourist", "Guide", "Admin"],
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
