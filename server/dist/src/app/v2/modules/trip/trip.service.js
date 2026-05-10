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
exports.TripService = void 0;
const client_1 = require("../../../../../prisma/generated/client");
const db_1 = __importDefault(require("../../../config/db"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const appError_1 = __importDefault(require("../../../helpers/appError"));
const getTripInclude = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const andConditions = [];
    if (filters.searchTerm) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: filters.searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: filters.searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }
    if (filters.category) {
        andConditions.push({
            category: {
                contains: filters.category,
                mode: "insensitive",
            },
        });
    }
    const tripIncludes = yield db_1.default.tripInclude.findMany({
        where: {
            AND: andConditions,
        },
        include: {
            _count: {
                select: {
                    trips: true,
                },
            },
        },
    });
    return tripIncludes;
});
const getAllTripsFromDB = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, status, tourId, guideId, minPrice, maxPrice } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    tour: {
                        title: {
                            contains: searchTerm,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    id: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }
    if (status) {
        andConditions.push({
            status: status.toUpperCase(),
        });
    }
    if (tourId) {
        andConditions.push({
            tourId,
        });
    }
    if (guideId) {
        andConditions.push({
            guideId,
        });
    }
    if (minPrice) {
        andConditions.push({
            price: {
                gte: parseFloat(minPrice) || 0,
            },
        });
    }
    if (maxPrice) {
        andConditions.push({
            price: {
                lte: parseFloat(maxPrice) || 50000,
            },
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield db_1.default.trip.findMany({
        where: whereConditions,
        include: {
            tour: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    category: true,
                    image: true,
                },
            },
            guide: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    city: true,
                },
            },
            includes: {
                include: {
                    tripInclude: true,
                },
            },
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield db_1.default.trip.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result.map((trip) => (Object.assign(Object.assign({}, trip), { includes: trip.includes.map((include) => include.tripInclude) }))),
    };
});
const getSingleTrip = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.trip.findUnique({
        where: {
            id,
        },
        include: {
            tour: true,
            guide: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    city: true,
                    avatar: true,
                },
            },
            includes: {
                include: {
                    tripInclude: true,
                },
            },
        },
    });
    if (!result) {
        throw new appError_1.default(404, "Trip not found");
    }
    return Object.assign(Object.assign({}, result), { includes: result.includes.map((include) => include.tripInclude) });
});
const createTripInDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tourId, guideId, startDate, endDate, maxGuests, tripIncludes } = payload;
    // Validate tour exists
    const tourExists = yield db_1.default.tour.findUnique({
        where: { id: tourId },
    });
    if (!tourExists) {
        throw new appError_1.default(404, "Tour not found");
    }
    // Validate guide exists if provided
    const guideExists = yield db_1.default.user.findUnique({
        where: { id: guideId },
    });
    if (!guideExists) {
        throw new appError_1.default(404, "Guide not found");
    }
    if (guideExists.role !== client_1.UserRole.GUIDE) {
        throw new appError_1.default(400, "User is not a guide");
    }
    const result = yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const trip = yield tx.trip.create({
            data: {
                tourId: tourId,
                guideId: guideId,
                startDate: startDate,
                endDate: endDate,
                price: tourExists.priceFrom,
                maxGuests: maxGuests,
            },
            include: {
                tour: true,
                guide: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        city: true,
                    },
                },
                includes: {
                    select: {
                        tripInclude: true,
                    },
                },
            },
        });
        yield tx.tripIncludeItem.createMany({
            data: tripIncludes.map((include) => ({
                tripId: trip.id,
                tripIncludeId: include,
            })),
        });
        return Object.assign(Object.assign({}, trip), { includes: trip.includes.map((include) => include.tripInclude) });
    }));
    return result;
});
const updateTripInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tourId, guideId, startDate, endDate, maxGuests, tripIncludes } = payload;
    // Validate tour exists
    const tourExists = yield db_1.default.tour.findUnique({
        where: { id: tourId },
    });
    if (!tourExists) {
        throw new appError_1.default(404, "Tour not found");
    }
    // Validate guide exists if provided
    const guideExists = yield db_1.default.user.findUnique({
        where: { id: guideId },
    });
    if (!guideExists) {
        throw new appError_1.default(404, "Guide not found");
    }
    if (guideExists.role !== client_1.UserRole.GUIDE) {
        throw new appError_1.default(400, "User is not a guide");
    }
    const result = yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const trip = yield tx.trip.update({
            where: { id },
            data: {
                tourId,
                guideId,
                startDate,
                endDate,
                maxGuests,
                price: tourExists.priceFrom,
            },
            include: {
                tour: true,
                guide: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        city: true,
                    },
                },
                includes: {
                    select: {
                        tripInclude: true,
                    },
                },
            },
        });
        yield tx.tripIncludeItem.deleteMany({ where: { tripId: id } });
        yield tx.tripIncludeItem.createMany({
            data: tripIncludes.map((include) => ({
                tripId: trip.id,
                tripIncludeId: include,
            })),
        });
        return Object.assign(Object.assign({}, trip), { includes: trip.includes.map((include) => include.tripInclude) });
    }));
    return result;
});
const softDeleteTripInDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.trip.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    });
    return result;
});
exports.TripService = {
    getTripInclude,
    getAllTripsFromDB,
    getSingleTrip,
    createTripInDB,
    updateTripInDB,
    softDeleteTripInDB,
};
