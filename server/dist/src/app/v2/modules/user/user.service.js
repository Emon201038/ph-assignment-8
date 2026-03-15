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
exports.UserService = void 0;
const db_1 = __importDefault(require("../../../config/db"));
const appError_1 = __importDefault(require("../../../helpers/appError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllUserFromDB = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, role, topGuides } = filters, filtersData = __rest(filters, ["searchTerm", "role", "topGuides"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: filters.searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: filters.searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }
    if (topGuides) {
        andConditions.push({
            role: "GUIDE",
            guideProfile: {
                rating: {
                    gte: 4.5,
                },
            },
        });
    }
    if (role) {
        andConditions.push({
            role: role.toUpperCase(),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            AND: Object.keys(filtersData).map((key) => ({
                [key]: {
                    equals: filtersData[key],
                    mode: "insensitive",
                },
            })),
        });
    }
    const users = yield db_1.default.user.findMany({
        where: {
            AND: andConditions,
        },
        include: {
            guideProfile: topGuides || (role || "").toUpperCase() === "GUIDE" ? true : false,
        },
        take: limit,
        skip: skip,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield db_1.default.user.count({
        where: {
            AND: andConditions,
        },
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: users,
    };
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.user.findUnique({
        where: {
            id,
        },
        include: {
            guideProfile: true,
        },
    });
    if (!result) {
        throw new appError_1.default(404, "User not found");
    }
    return result;
});
const createUserInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, country, city, avatar, bio, phone } = payload;
    // Check if user already exists
    const existingUser = yield db_1.default.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new appError_1.default(400, "Email already in use");
    }
    // Create user
    const result = yield db_1.default.user.create({
        data: {
            name,
            email,
            password: yield bcryptjs_1.default.hash(password, 10),
            role: role ? role.toUpperCase() : "TRAVELER",
            country: country || "Unknown",
            city: city || "Unknown",
            avatar: avatar || null,
            bio: bio || null,
            phone: phone || null,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            city: true,
            country: true,
            avatar: true,
            createdAt: true,
        },
    });
    return result;
});
exports.UserService = {
    getAllUserFromDB,
    getSingleUserFromDB,
    createUserInDB,
};
