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
const client_1 = require("../../../../../prisma/generated/client");
const db_1 = __importDefault(require("../../../config/db"));
const appError_1 = __importDefault(require("../../../helpers/appError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const upload_files_1 = require("../../../utils/upload-files");
const cleanObject = (obj) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)));
};
const getAllUserFromDB = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, role, topGuides, specialties, interests, languages, gender } = filters, filtersData = __rest(filters, ["searchTerm", "role", "topGuides", "specialties", "interests", "languages", "gender"]);
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
            role: client_1.UserRole.GUIDE,
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
    if (specialties) {
        andConditions.push({
            guideProfile: {
                specialties: {
                    has: specialties,
                },
            },
        });
    }
    if (languages) {
        if (role.toUpperCase() === client_1.UserRole.GUIDE) {
            if (Array.isArray(languages)) {
                andConditions.push({
                    guideProfile: {
                        languages: {
                            hasSome: languages,
                        },
                    },
                });
            }
            else {
                andConditions.push({
                    guideProfile: {
                        languages: {
                            has: languages,
                        },
                    },
                });
            }
        }
        else if (role.toUpperCase() === client_1.UserRole.TRAVELER) {
            if (Array.isArray(languages)) {
                andConditions.push({
                    travelerProfile: {
                        languages: {
                            hasSome: languages,
                        },
                    },
                });
            }
            else {
                andConditions.push({
                    travelerProfile: {
                        languages: {
                            has: languages,
                        },
                    },
                });
            }
        }
    }
    if (gender) {
        if (role.toUpperCase() === client_1.UserRole.GUIDE) {
            andConditions.push({
                guideProfile: {
                    gender: {
                        equals: gender.toUpperCase(),
                    },
                },
            });
        }
        else if (role.toUpperCase() === client_1.UserRole.TRAVELER) {
            andConditions.push({
                travelerProfile: {
                    gender: {
                        equals: gender.toUpperCase(),
                    },
                },
            });
        }
    }
    if (interests) {
        andConditions.push({
            travelerProfile: {
                interests: {
                    has: interests,
                },
            },
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
            guideProfile: topGuides || (role || "").toUpperCase() === client_1.UserRole.GUIDE
                ? true
                : false,
            travelerProfile: (role || "").toUpperCase() === client_1.UserRole.TRAVELER ? true : false,
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
        data: users.map((_a) => {
            var { guideProfile, travelerProfile } = _a, user = __rest(_a, ["guideProfile", "travelerProfile"]);
            return (Object.assign(Object.assign({}, user), { profile: guideProfile || travelerProfile }));
        }),
    };
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.user.findUnique({
        where: {
            id,
        },
        include: {
            guideProfile: true,
            travelerProfile: true,
        },
        omit: {
            password: true,
        },
    });
    if (!result) {
        throw new appError_1.default(404, "User not found");
    }
    const { guideProfile, travelerProfile } = result, userData = __rest(result, ["guideProfile", "travelerProfile"]);
    let profileInfo = null;
    if (userData.role === client_1.UserRole.GUIDE) {
        profileInfo = guideProfile;
    }
    if (userData.role === client_1.UserRole.TRAVELER) {
        profileInfo = travelerProfile;
    }
    return Object.assign({ profile: profileInfo }, userData);
});
const createUserInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, country, city, avatar, bio, phone } = payload;
    const existingUser = yield db_1.default.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new appError_1.default(400, "Email already in use");
    }
    const userData = {
        name,
        email,
        password: yield bcryptjs_1.default.hash(password, 10),
        role: role ? role.toUpperCase() : client_1.UserRole.TRAVELER,
        country: country || null,
        city: city || null,
        avatar: avatar || null,
        bio: bio || null,
        phone: phone || null,
    };
    // Traveler Profile
    if (role === client_1.UserRole.TRAVELER) {
        userData.travelerProfile = {
            create: {
                gender: payload.gender,
                bloodGroup: payload.bloodGroup,
                languages: payload.languages || [],
                interests: payload.interests || [],
                dateOfBirth: payload.dateOfBirth,
                aboutMe: payload.bio,
            },
        };
    }
    // Guide Profile
    if (role === client_1.UserRole.GUIDE) {
        userData.guideProfile = {
            create: {
                gender: payload.gender,
                bloodGroup: payload.bloodGroup,
                languages: payload.languages || [],
                specialties: payload.specialties || [],
                dateOfBirth: payload.dateOfBirth,
                bio: payload.bio,
            },
        };
    }
    // Create user
    const result = yield db_1.default.user.create({
        data: userData,
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
const updateUserInDB = (id, payload, files) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let avatarUrl;
    const existingUser = yield db_1.default.user.findUnique({
        where: { id },
        select: { role: true },
    });
    if ((_a = files === null || files === void 0 ? void 0 : files.avatar) === null || _a === void 0 ? void 0 : _a.length) {
        const upload = yield (0, upload_files_1.uploadFileToCloudinary)(files.avatar[0], "avatar");
        if (upload === null || upload === void 0 ? void 0 : upload.url) {
            avatarUrl = upload.url;
        }
    }
    const userData = cleanObject({
        name: payload.name,
        country: payload.country,
        city: payload.city,
        bio: payload.bio,
        avatar: avatarUrl,
    });
    const guideData = cleanObject({
        gender: payload.gender,
        bloodGroup: payload.bloodGroup,
        languages: payload.languages,
        specialties: payload.specialties,
        dateOfBirth: payload.dateOfBirth,
    });
    const travelerData = cleanObject({
        gender: payload.gender,
        bloodGroup: payload.bloodGroup,
        interests: payload.interests,
        dateOfBirth: payload.dateOfBirth,
        // languages: payload.languages,
    });
    const result = yield db_1.default.user.update({
        where: { id },
        data: Object.assign(Object.assign(Object.assign({}, userData), ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.role) === client_1.UserRole.GUIDE &&
            Object.keys(guideData).length > 0 && {
            guideProfile: {
                update: guideData,
            },
        })), ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.role) === client_1.UserRole.TRAVELER &&
            Object.keys(travelerData).length > 0 && {
            travelerProfile: {
                update: travelerData,
            },
        })),
        include: {
            guideProfile: true,
            travelerProfile: true,
        },
    });
    return result;
});
const hardDeleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.user.delete({
        where: {
            id,
        },
    });
    return data;
});
const softDeleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.user.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return data;
});
const addEmergencyContact = (userId, _a) => __awaiter(void 0, void 0, void 0, function* () {
    var { user, id } = _a, payload = __rest(_a, ["user", "id"]);
    const data = yield db_1.default.emergencyContact.create({
        data: Object.assign(Object.assign({}, payload), { userId }),
    });
    return data;
});
const getEmergencyContact = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.emergencyContact.findMany({
        where: {
            userId: id,
        },
    });
    return data;
});
const updateEmergencyContact = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.emergencyContact.update({
        where: {
            id: payload.id,
        },
        data: Object.assign({}, payload),
    });
    return data;
});
const deleteEmergencyContact = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.emergencyContact.delete({
        where: {
            id,
        },
    });
    return data;
});
exports.UserService = {
    getAllUserFromDB,
    getSingleUserFromDB,
    createUserInDB,
    updateUserInDB,
    hardDeleteUser,
    softDeleteUser,
    addEmergencyContact,
    getEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
};
