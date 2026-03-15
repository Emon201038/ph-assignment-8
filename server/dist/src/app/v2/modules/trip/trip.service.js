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
        data: result,
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
    const { tourId, guideId, startDate, endDate, price, maxGuests, includes } = payload;
    // Validate tour exists
    const tourExists = yield db_1.default.tour.findUnique({
        where: { id: tourId },
    });
    if (!tourExists) {
        throw new appError_1.default(404, "Tour not found");
    }
    // Validate guide exists if provided
    if (guideId) {
        const guideExists = yield db_1.default.user.findUnique({
            where: { id: guideId },
        });
        if (!guideExists) {
            throw new appError_1.default(404, "Guide not found");
        }
    }
    // Validate dates
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (startDateObj >= endDateObj) {
        throw new appError_1.default(400, "Start date must be before end date");
    }
    if (startDateObj < new Date()) {
        throw new appError_1.default(400, "Start date must be in the future");
    }
    // Create trip
    const result = yield db_1.default.trip.create({
        data: {
            tourId: tourId,
            guideId: guideId,
            startDate: startDateObj,
            endDate: endDateObj,
            price: price,
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
        },
    });
    return result;
});
exports.TripService = {
    getTripInclude,
    getAllTripsFromDB,
    getSingleTrip,
    createTripInDB,
};
