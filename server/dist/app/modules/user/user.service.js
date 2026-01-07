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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.createTourist = void 0;
const appError_1 = __importDefault(require("../../helpers/appError"));
const httpStatus_1 = require("../../utils/httpStatus");
const user_interface_1 = require("./user.interface");
const user_model_1 = __importDefault(require("./user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const tourist_model_1 = require("../tourist/tourist.model");
const queryBuilderByPipline_1 = require("../../lib/queryBuilderByPipline");
const guide_model_1 = require("../guide/guide.model");
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const populatedArray = [];
    if ((query === null || query === void 0 ? void 0 : query.role) === user_interface_1.UserRole.GUIDE) {
        populatedArray.push({
            model: guide_model_1.Guide,
            localField: "_id",
            foreignField: "userId",
            filterKeys: ["expertise", "languages"],
            as: "profile",
        });
    }
    if ((query === null || query === void 0 ? void 0 : query.role) === user_interface_1.UserRole.TOURIST) {
        populatedArray.push({
            model: tourist_model_1.Tourist,
            localField: "_id",
            foreignField: "userId",
            filterKeys: ["interests"],
            as: "profile",
        });
    }
    const qb = new queryBuilderByPipline_1.DynamicQueryBuilder(user_model_1.default, query, populatedArray);
    const res = yield qb
        .search(["name", "email", "phone"])
        .filter()
        .filterPopulated()
        .sort()
        .paginate()
        .exec();
    if ((query === null || query === void 0 ? void 0 : query.role) === user_interface_1.UserRole.GUIDE) {
        for (const user of res.data) {
            const ratingAgg = yield user_model_1.default.aggregate([
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
            const tripsAgg = yield user_model_1.default.aggregate([
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
            user.profile.rating = (_b = (_a = ratingAgg[0]) === null || _a === void 0 ? void 0 : _a.rating) !== null && _b !== void 0 ? _b : 0;
            user.profile.totalTrips = (_d = (_c = tripsAgg[0]) === null || _c === void 0 ? void 0 : _c.totalTrips) !== null && _d !== void 0 ? _d : 0;
        }
    }
    return { users: res.data, meta: res.meta };
});
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const mainProfile = yield user_model_1.default.findById(userId).lean();
    if (!mainProfile) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "User not found.");
    }
    let user;
    if (!user) {
        user = yield guide_model_1.Guide.findOne({ userId }).lean();
    }
    if (!user) {
        user = yield tourist_model_1.Tourist.findOne({ userId }).lean();
    }
    const doc = Object.assign(Object.assign({}, user), { profile: mainProfile });
    return doc;
});
const createTourist = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { email } = payload, rest = __rest(payload, ["email"]);
        // Check if user already exists
        const existingUser = yield user_model_1.default.findOne({ email }).session(session);
        if (existingUser) {
            if (existingUser.isDeleted) {
                // Remove soft-deleted user and related Tourist profile
                yield user_model_1.default.deleteOne({ _id: existingUser._id }).session(session);
                yield tourist_model_1.Tourist.deleteOne({ userId: existingUser._id }).session(session);
            }
            else if (existingUser.isBlocked) {
                throw new appError_1.default(httpStatus_1.HTTP_STATUS.BAD_REQUEST, "User account has been blocked. Please contact admin");
            }
            else {
                throw new appError_1.default(httpStatus_1.HTTP_STATUS.CONFLICT, "User already exists with this email.");
            }
        }
        // Create new User
        const [user] = yield user_model_1.default.create([
            Object.assign(Object.assign({ email }, rest), { role: user_interface_1.UserRole.TOURIST }),
        ], { session });
        // Create Tourist profile
        yield tourist_model_1.Tourist.create([
            Object.assign({ userId: user._id }, rest),
        ], { session });
        // Commit transaction
        yield session.commitTransaction();
        session.endSession();
        return user;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.createTourist = createTourist;
const updateUser = (userId, payload, loggedInUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
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
        const isMatchPass = yield bcryptjs_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.currentPassword, user.password);
        if (!isMatchPass) {
            throw new appError_1.default(httpStatus_1.HTTP_STATUS.BAD_REQUEST, "Invalid password.");
        }
    }
    return yield user_model_1.default.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
});
const updateUserRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "User not found.");
    }
    if (user.role === user_interface_1.UserRole.ADMIN) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.FORBIDDEN, "You can't update role.");
    }
    return yield user_model_1.default.findByIdAndUpdate(userId, { role }, { new: true, runValidators: true });
});
const deleteUser = (loggedInUser, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(userId);
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
    return yield user_model_1.default.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, runValidators: true });
});
exports.UserService = {
    getAllUsers,
    getUser,
    createUser: exports.createTourist,
    updateUser,
    updateUserRole,
    deleteUser,
};
