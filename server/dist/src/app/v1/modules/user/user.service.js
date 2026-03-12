"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.createTourist = void 0;
const appError_1 = __importDefault(require("../../../helpers/appError"));
const httpStatus_1 = require("../../../utils/httpStatus");
const user_interface_1 = require("./user.interface");
const user_model_1 = __importDefault(require("./user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const tourist_model_1 = require("../tourist/tourist.model");
const queryBuilderByPipline_1 = require("../../../lib/queryBuilderByPipline");
const guide_model_1 = require("../guide/guide.model");
const getAllUsers = async (query) => {
    const populatedArray = [];
    if (query?.role === user_interface_1.UserRole.GUIDE) {
        populatedArray.push({
            model: guide_model_1.Guide,
            localField: "_id",
            foreignField: "userId",
            filterKeys: ["expertise", "languages"],
            as: "profile",
        });
    }
    if (query?.role === user_interface_1.UserRole.TOURIST) {
        populatedArray.push({
            model: tourist_model_1.Tourist,
            localField: "_id",
            foreignField: "userId",
            filterKeys: ["interests"],
            as: "profile",
        });
    }
    const qb = new queryBuilderByPipline_1.DynamicQueryBuilder(user_model_1.default, query, populatedArray);
    const res = await qb
        .search(["name", "email", "phone"])
        .filter()
        .filterPopulated()
        .sort()
        .paginate()
        .exec();
    if (query?.role === user_interface_1.UserRole.GUIDE) {
        for (const user of res.data) {
            const ratingAgg = await user_model_1.default.aggregate([
                { $match: { _id: user._id } },
                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "docId",
                        as: "reviews",
                    },
                },
                {
                    $project: {
                        rating: {
                            $ifNull: [{ $avg: "$reviews.rating" }, 0],
                        },
                    },
                },
            ]);
            const tripsAgg = await user_model_1.default.aggregate([
                { $match: { _id: user._id } },
                {
                    $lookup: {
                        from: "bookings",
                        localField: "_id",
                        foreignField: "guideId",
                        as: "bookings",
                    },
                },
                {
                    $project: {
                        totalTrips: { $size: "$bookings" },
                    },
                },
            ]);
            user.profile.rating = ratingAgg[0]?.rating ?? 0;
            user.profile.totalTrips = tripsAgg[0]?.totalTrips ?? 0;
        }
    }
    return { users: res.data, meta: res.meta };
};
const getUser = async (userId) => {
    const mainProfile = await user_model_1.default.findById(userId).lean();
    if (!mainProfile) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "User not found.");
    }
    let user;
    if (!user) {
        user = await guide_model_1.Guide.findOne({ userId }).lean();
    }
    if (!user) {
        user = await tourist_model_1.Tourist.findOne({ userId }).lean();
    }
    const doc = { ...user, profile: mainProfile };
    return doc;
};
const createTourist = async (payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { email, ...rest } = payload;
        // Check if user already exists
        const existingUser = await user_model_1.default.findOne({ email }).session(session);
        if (existingUser) {
            if (existingUser.isDeleted) {
                // Remove soft-deleted user and related Tourist profile
                await user_model_1.default.deleteOne({ _id: existingUser._id }).session(session);
                await tourist_model_1.Tourist.deleteOne({ userId: existingUser._id }).session(session);
            }
            else if (existingUser.isBlocked) {
                throw new appError_1.default(httpStatus_1.HTTP_STATUS.BAD_REQUEST, "User account has been blocked. Please contact admin");
            }
            else {
                throw new appError_1.default(httpStatus_1.HTTP_STATUS.CONFLICT, "User already exists with this email.");
            }
        }
        // Create new User
        const [user] = await user_model_1.default.create([
            {
                email,
                ...rest,
                role: user_interface_1.UserRole.TOURIST,
            },
        ], { session });
        // Create Tourist profile
        await tourist_model_1.Tourist.create([
            {
                userId: user._id,
                ...rest,
            },
        ], { session });
        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        return user;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
exports.createTourist = createTourist;
const updateUser = async (userId, payload, loggedInUser) => {
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "User not found.");
    }
    if (payload.email) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.FORBIDDEN, "You can't update email.");
    }
    if (loggedInUser.role !== user_interface_1.UserRole.ADMIN) {
        if (user.isDeleted || user.isBlocked) {
            throw new appError_1.default(httpStatus_1.HTTP_STATUS.FORBIDDEN, "User is blocked or deleted.");
        }
        if (payload.role === user_interface_1.UserRole.ADMIN) {
            throw new appError_1.default(httpStatus_1.HTTP_STATUS.FORBIDDEN, "Your not authorized to update role.");
        }
        // if (payload.isBlocked || payload.isVerified) {
        //   throw new AppError(
        //     HTTP_STATUS.FORBIDDEN,
        //     "Your not authorized to update status."
        //   );
        // }
    }
    if (payload.password) {
        const isMatchPass = await bcryptjs_1.default.compare(payload?.currentPassword, user.password);
        if (!isMatchPass) {
            throw new appError_1.default(httpStatus_1.HTTP_STATUS.BAD_REQUEST, "Invalid password.");
        }
    }
    return await user_model_1.default.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
};
const updateUserRole = async (userId, role) => {
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "User not found.");
    }
    if (user.role === user_interface_1.UserRole.ADMIN) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.FORBIDDEN, "You can't update role.");
    }
    return await user_model_1.default.findByIdAndUpdate(userId, { role }, { new: true, runValidators: true });
};
const deleteUser = async (loggedInUser, userId) => {
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "User not found.");
    }
    if (user.role === user_interface_1.UserRole.ADMIN
    // user.adminInfo?.permissions.includes("DELETE_USER")
    ) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.FORBIDDEN, "You are not authorized to delete this user.");
    }
    if (loggedInUser.role !== user_interface_1.UserRole.ADMIN) {
        if (loggedInUser.userId !== user._id.toString()) {
            throw new appError_1.default(httpStatus_1.HTTP_STATUS.FORBIDDEN, "You are not authorized to delete this user.");
        }
        if (user.isDeleted || user.isBlocked) {
            throw new appError_1.default(httpStatus_1.HTTP_STATUS.FORBIDDEN, "User is blocked or deleted.");
        }
    }
    return await user_model_1.default.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, runValidators: true });
};
const getUserByEmail = async (email) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "User not found.");
    }
    return user;
};
exports.UserService = {
    getAllUsers,
    getUser,
    createUser: exports.createTourist,
    updateUser,
    updateUserRole,
    deleteUser,
    getUserByEmail,
};
