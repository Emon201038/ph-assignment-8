"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouristService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_interface_1 = require("../user/user.interface");
const user_model_1 = __importDefault(require("../user/user.model"));
const tourist_model_1 = require("./tourist.model");
const httpStatus_1 = require("../../../utils/httpStatus");
const appError_1 = __importDefault(require("../../../helpers/appError"));
const queryBuilder_1 = require("../../../lib/queryBuilder");
const upload_files_1 = require("../../../utils/upload-files");
const createTourist = async (req) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { email, ...rest } = req.body;
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
        if (req.file) {
            const uploadRes = await (0, upload_files_1.uploadFileToCloudinary)(req.file, "local-guide");
            if (!uploadRes)
                throw new appError_1.default(500, "Failed to upload profile image.");
            rest.profileImage = uploadRes?.url;
        }
        // Create new User
        const [user] = await user_model_1.default.create([
            {
                email,
                name: req.body.name,
                password: req.body.password,
                phone: req.body.phone,
                address: req.body.address,
                gender: req.body.gender,
                profileImage: rest.profileImage,
                role: user_interface_1.UserRole.TOURIST,
                bio: req.body.bio,
                roleProfileModel: "Tourist",
            },
        ], { session });
        // Create Tourist profile
        const [tourist] = await tourist_model_1.Tourist.create([
            {
                userId: user._id,
                preferredLanguage: req.body.preferredLanguage,
                interests: req.body.interests.map((i) => i.trim()).filter(Boolean) ||
                    [],
                preferredCurrency: req.body.preferredCurrency,
                emergencyContact: req.body.emergencyContact,
            },
        ], { session });
        user.profile = tourist._id;
        await user.save({ session });
        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        return user;
    }
    catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const getTourists = async (queryParams) => {
    const queryBuilder = new queryBuilder_1.QueryBuilder(tourist_model_1.Tourist, queryParams);
    // Filter Tourist fields, excluding User-specific fields
    queryBuilder.filter(["gender", "role", "isBlocked", "isDeleted"]);
    // Build User filters
    const userFilters = {};
    if (queryParams.gender)
        userFilters.gender = "gender";
    if (queryParams.role)
        userFilters.role = "role";
    if (queryParams.isBlocked)
        userFilters.isBlocked = "isBlocked";
    if (queryParams.isDeleted)
        userFilters.isDeleted = "isDeleted";
    // Apply User filters if any exist
    if (Object.keys(userFilters).length > 0) {
        await queryBuilder.filterPopulated(user_model_1.default, "userId", userFilters);
    }
    // Search
    if (queryParams.searchTerm) {
        await queryBuilder.searchPopulated(user_model_1.default, "userId", [
            "name",
            "email",
            "phone",
        ]);
    }
    const result = await queryBuilder
        .sort()
        .paginate()
        .populate(["userId:name;email;phone;profileImage;gender"], {
        userId: "user",
    })
        .execWithMeta();
    return { tourists: result.data, meta: result.meta };
};
const getTouristById = async (id) => {
    const tourist = await tourist_model_1.Tourist.findById(id).populate("userId", "name email");
    if (!tourist) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "Tourist not found");
    }
    return tourist;
};
const updateTourist = async (id, data) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const tourist = await tourist_model_1.Tourist.findById(id);
        if (!tourist) {
            throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "Tourist not found");
        }
        await tourist_model_1.Tourist.findOneAndUpdate({ _id: id }, {
            $set: {
                preferredLanguage: data.preferredLanguage,
                interests: data?.interests?.map((i) => i.trim()).filter(Boolean) || [],
                preferredCurrency: data.preferredCurrency,
                emergencyContact: data.emergencyContact,
            },
        }, { new: true }).session(session);
        await user_model_1.default.findOneAndUpdate({ _id: tourist.userId }, {
            $set: {
                name: data.name,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                bio: data.bio,
            },
        }, { new: true }).session(session);
        await session.commitTransaction();
        session.endSession();
        return await tourist_model_1.Tourist.findById(id).populate("userId", "name email phone address gender bio createdAt isDeleted isBlocked");
    }
    catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const deleteTourist = async (id) => {
    const tourist = await tourist_model_1.Tourist.findById(id);
    if (!tourist) {
        throw new appError_1.default(httpStatus_1.HTTP_STATUS.NOT_FOUND, "Tourist not found");
    }
    await user_model_1.default.updateOne({ _id: tourist.userId }, { $set: { isDeleted: true } });
    return tourist;
};
exports.TouristService = {
    createTourist,
    getTourists,
    getTouristById,
    updateTourist,
    deleteTourist,
};
