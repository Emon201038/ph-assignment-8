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
exports.TourService = void 0;
const db_1 = __importDefault(require("../../../config/db"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const appError_1 = __importDefault(require("../../../helpers/appError"));
const getAllTourFromDB = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm, category, country, city, minPrice, maxPrice, language } = filters;
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    slug: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    destination: {
                        OR: [
                            {
                                name: {
                                    contains: searchTerm,
                                    mode: "insensitive",
                                },
                            },
                            {
                                city: {
                                    contains: searchTerm,
                                    mode: "insensitive",
                                },
                            },
                            {
                                country: {
                                    contains: searchTerm,
                                    mode: "insensitive",
                                },
                            },
                        ],
                    },
                },
            ],
        });
    }
    if (category) {
        andConditions.push({
            category: category.toUpperCase(),
        });
    }
    if (country) {
        andConditions.push({
            destination: {
                country: {
                    contains: country,
                    mode: "insensitive",
                },
            },
        });
    }
    if (city) {
        andConditions.push({
            destination: {
                city: {
                    contains: city,
                    mode: "insensitive",
                },
            },
        });
    }
    if (minPrice) {
        andConditions.push({
            priceFrom: {
                gte: parseInt(minPrice) || 0,
            },
        });
    }
    if (maxPrice) {
        andConditions.push({
            priceFrom: {
                lte: parseInt(maxPrice) || 5000,
            },
        });
    }
    if (language) {
        andConditions.push({
            destination: {
                languages: {
                    has: language,
                },
            },
        });
        const lang = yield db_1.default.destination.groupBy({
            by: ["languages"],
        });
        const mainarr = lang.map((i) => i.languages).flatMap((i) => i);
        const unique = mainarr.filter((item, index, arr) => arr.indexOf(item) === index);
        console.log(unique.map((i) => ({
            label: i.charAt(0).toUpperCase() + i.slice(1),
            value: i,
        })));
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield db_1.default.tour.findMany({
        where: whereConditions,
        include: {
            destination: {
                select: {
                    city: true,
                    country: true,
                },
            },
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield db_1.default.tour.count({
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
const getSingleTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.tour.findUnique({
        where: {
            id,
        },
        include: {
            destination: {
                select: {
                    city: true,
                    country: true,
                    languages: true,
                },
            },
            trips: {
                select: {
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
                        select: {
                            tripInclude: {
                                select: {
                                    category: true,
                                    title: true,
                                    description: true,
                                },
                            },
                        },
                    },
                    startDate: true,
                    endDate: true,
                    price: true,
                    maxGuests: true,
                    bookedSeats: true,
                    status: true,
                },
            },
            itineraries: {
                select: {
                    dayNumber: true,
                    title: true,
                    description: true,
                    icon: true,
                },
            },
        },
    });
    return Object.assign(Object.assign({}, result), { trips: result === null || result === void 0 ? void 0 : result.trips.map((trip) => (Object.assign(Object.assign({}, trip), { includes: trip.includes.map((include) => include.tripInclude) }))) });
});
const createTourInDB = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, destinationId, category, priceFrom, image, slug, durationDays, maxGroupSize, difficulty, } = payload;
    // Validate required fields
    if (!title ||
        !description ||
        !destinationId ||
        !category ||
        priceFrom === null ||
        !durationDays ||
        !maxGroupSize ||
        !difficulty) {
        throw new appError_1.default(400, "Missing required fields");
    }
    // Validate destination exists
    const destinationExists = yield db_1.default.destination.findUnique({
        where: { id: destinationId },
    });
    if (!destinationExists) {
        throw new appError_1.default(404, "Destination not found");
    }
    // Generate slug if not provided
    const tourSlug = slug ||
        title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9\-]/g, "");
    // Create tour
    const result = yield db_1.default.tour.create({
        data: {
            title,
            description,
            destinationId,
            category: category.toUpperCase(),
            priceFrom,
            image: image || "https://via.placeholder.com/400x300",
            slug: tourSlug,
            durationDays,
            maxGroupSize,
            difficulty: difficulty.toUpperCase(),
            createdById: userId,
        },
        include: {
            destination: {
                select: {
                    id: true,
                    name: true,
                    city: true,
                    country: true,
                },
            },
            creator: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    return result;
});
exports.TourService = {
    getAllTourFromDB,
    getSingleTour,
    createTourInDB,
};
