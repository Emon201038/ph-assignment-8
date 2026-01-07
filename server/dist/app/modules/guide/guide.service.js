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
exports.GuideService = void 0;
const queryBuilder_1 = require("../../lib/queryBuilder");
const user_interface_1 = require("../user/user.interface");
const user_model_1 = __importDefault(require("../user/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../helpers/appError"));
const guide_model_1 = require("./guide.model");
const httpStatus_1 = require("../../utils/httpStatus");
const queryBuilderByPipline_1 = require("../../lib/queryBuilderByPipline");
const booking_model_1 = require("../booking/booking.model");
const getGuides = (queryString) => __awaiter(void 0, void 0, void 0, function* () {
    const builder = new queryBuilder_1.QueryBuilder(guide_model_1.Guide, Object.assign({}, queryString));
    const res = yield builder
        .filter()
        .search(["email", "name", "phone"])
        .paginate()
        .select(["-password"])
        .execWithMeta();
    const builder2 = new queryBuilderByPipline_1.DynamicQueryBuilder(guide_model_1.Guide, Object.assign({}, queryString), [
        {
            model: user_model_1.default,
            localField: "userId",
            foreignField: "_id",
            as: "profile",
            filterKeys: ["gender", "role"],
            searchFields: ["name", "email", "phone"],
        },
    ]);
    const res2 = yield builder2
        .searchPopulated() // Search populated models (includes documents)
        .filter() // Filter main model
        .filterPopulated() // Filter populated models (reuses same populated docs)
        .sort()
        .paginate()
        .exec();
    return { guides: res2.data, meta: res.meta };
});
const getGuide = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const guide = yield guide_model_1.Guide.findOne({ userId: id }).populate("userId", "-password");
    return guide;
});
const createGuide = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const payload = req.body;
        // Check if user exists
        const existingUser = yield user_model_1.default.findOne({ email: payload.email }).session(session);
        if (existingUser) {
            if (existingUser.isDeleted) {
                // Delete the soft-deleted user and associated guide
                yield user_model_1.default.deleteOne({ _id: existingUser._id }).session(session);
                yield guide_model_1.Guide.deleteOne({ userId: existingUser._id }).session(session);
            }
            else {
                throw new appError_1.default(409, "User already exists with this email.");
            }
        }
        // Create new user
        const [user] = yield user_model_1.default.create([
            Object.assign(Object.assign({}, payload), { role: user_interface_1.UserRole.GUIDE, roleProfileModel: "Guide" }),
        ], { session });
        // Create guide profile
        const [guide] = yield guide_model_1.Guide.create([
            Object.assign({ userId: user._id }, payload),
        ], { session });
        user.profile = guide._id;
        yield user.save({ session });
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
const updateGuide = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { id } = req.params;
        const data = req.body;
        const guide = yield guide_model_1.Guide.findOne({ userId: id });
        if (!guide) {
            throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "Guide not found");
        }
        // Update guide
        yield guide_model_1.Guide.findOneAndUpdate({ userId: id }, {
            $set: {
                languages: data.languages,
                expertise: ((_a = data === null || data === void 0 ? void 0 : data.expertise) === null || _a === void 0 ? void 0 : _a.map((i) => i.trim()).filter(Boolean)) || [],
                experienceYears: data.experienceYears,
                hourlyRate: data.hourlyRate,
            },
        }, { new: true }).session(session);
        // Update user
        yield user_model_1.default.findOneAndUpdate({ _id: id }, {
            $set: {
                name: data.name,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                bio: data.bio,
            },
        }, { new: true }).session(session);
        // Commit transaction
        yield session.commitTransaction();
        session.endSession();
        return yield user_model_1.default.findById(id).populate("profile");
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const deleteGuide = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const guide = yield guide_model_1.Guide.findOne({ userId: id }).session(session);
        if (!guide) {
            throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "Guide not found");
        }
        yield user_model_1.default.updateOne({ _id: id }, { isDeleted: true }).session(session);
        yield session.commitTransaction();
        session.endSession();
        return { success: true, message: "Guide deleted successfully", data: null };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getActiveTours = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield booking_model_1.Booking.find({
        user: id,
    }).populate({
        path: "trip",
        populate: {
            path: "tourId",
        },
    });
});
exports.GuideService = {
    getGuides,
    getGuide,
    createGuide,
    updateGuide,
    deleteGuide,
    getActiveTours,
};
