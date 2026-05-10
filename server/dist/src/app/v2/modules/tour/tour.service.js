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
exports.TourService = void 0;
const slugify_1 = __importDefault(require("slugify"));
const client_1 = require("../../../../../prisma/generated/client");
const db_1 = __importDefault(require("../../../config/db"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const appError_1 = __importDefault(require("../../../helpers/appError"));
const upload_files_1 = require("../../../utils/upload-files");
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
                                id: {
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
const getSingleTour = (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, isSlug = false) {
    if (!isSlug) {
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
    }
    else {
        const result = yield db_1.default.tour.findUnique({
            where: {
                slug: id,
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
    }
});
const createTourInDB = (payload, userId, image) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, destinationId, category, priceFrom, durationDays, maxGroupSize, } = payload;
    // Validate destination exists
    const destinationExists = yield db_1.default.destination.findUnique({
        where: { id: destinationId },
    });
    if (!destinationExists) {
        throw new appError_1.default(404, "Destination not found");
    }
    const tourSlug = (0, slugify_1.default)(title, { lower: true, strict: true, trim: true });
    let imageUrl = "";
    if (image) {
        const result = yield (0, upload_files_1.uploadFileToCloudinary)(image, "tour-buddy/tours");
        if (!(result === null || result === void 0 ? void 0 : result.url)) {
            throw new appError_1.default(400, "Image upload failed");
        }
        imageUrl = result.url;
    }
    if (!imageUrl) {
        throw new appError_1.default(400, "Image upload failed");
    }
    // Create tour
    const { tour: result } = yield db_1.default.$transaction((tnx) => __awaiter(void 0, void 0, void 0, function* () {
        const tour = yield tnx.tour.create({
            data: {
                title,
                description,
                destinationId,
                category: category.toUpperCase(),
                priceFrom,
                image: imageUrl,
                slug: tourSlug,
                durationDays,
                maxGroupSize,
                difficulty: client_1.TourDifficulty.MODERATE,
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
        const tourGuides = yield tnx.tour_Guide.createMany({
            data: payload.guides.map((guideId) => ({
                tourId: tour.id,
                guideId,
            })),
        });
        return {
            tour,
            tourGuides,
        };
    }));
    return result;
});
const deleteTour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.tour.delete({
        where: {
            id,
        },
    });
    return result;
});
const updateTourInDB = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, difficulty, destinationId, guides = [] } = payload, body = __rest(payload, ["category", "difficulty", "destinationId", "guides"]);
    const slug = (0, slugify_1.default)(payload.title, {
        lower: true,
        strict: true,
        trim: true,
    });
    let imageUrl;
    // Upload image only if new file exists
    if (file) {
        const uploadedRes = yield (0, upload_files_1.uploadFileToCloudinary)(file, "tour-buddy/tours");
        if (!(uploadedRes === null || uploadedRes === void 0 ? void 0 : uploadedRes.url)) {
            throw new appError_1.default(400, "Image upload failed");
        }
        imageUrl = uploadedRes.url;
    }
    const result = yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedTour = yield tx.tour.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign({}, body), { slug, category: category, difficulty: difficulty, destination: {
                    connect: { id: destinationId },
                } }), (imageUrl && { image: imageUrl })),
        });
        yield tx.tour_Guide.deleteMany({
            where: {
                tourId: id,
                guideId: {
                    notIn: guides,
                },
            },
        });
        const existingGuides = yield tx.tour_Guide.findMany({
            where: {
                tourId: id,
            },
            select: {
                guideId: true,
            },
        });
        const existingGuideIds = existingGuides.map((guide) => guide.guideId);
        const newGuideIds = guides.filter((guideId) => !existingGuideIds.includes(guideId));
        if (newGuideIds.length > 0) {
            yield tx.tour_Guide.createMany({
                data: newGuideIds.map((guideId) => ({
                    tourId: id,
                    guideId,
                })),
                skipDuplicates: true,
            });
        }
        return updatedTour;
    }));
    return result;
});
const getTourGuides = (tourId, searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let whereConditions = [
        {
            tourId,
        },
    ];
    if (searchTerm) {
        whereConditions.push({
            AND: [
                {
                    guide: {
                        OR: [
                            {
                                name: {
                                    contains: searchTerm,
                                    mode: "insensitive",
                                },
                            },
                            {
                                email: {
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
    const result = yield db_1.default.tour_Guide.findMany({
        where: { AND: whereConditions },
        take: 10,
        select: {
            guide: {
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    city: true,
                    avatar: true,
                },
            },
        },
    });
    return result.map((g) => (Object.assign({}, g.guide)));
});
const toggleTourGuide = (tourId, guideId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield db_1.default.tour_Guide.findUnique({
        where: {
            tourId_guideId: {
                guideId,
                tourId,
            },
        },
    });
    let returnData = null;
    let message = "";
    if (isExists) {
        returnData = yield db_1.default.tour_Guide.delete({
            where: {
                tourId_guideId: {
                    guideId,
                    tourId,
                },
            },
        });
        message = "Guide removed from tour successfully";
    }
    else {
        returnData = yield db_1.default.tour_Guide.create({
            data: {
                tourId,
                guideId,
            },
        });
        message = "Guide added to tour successfully";
    }
    return {
        message,
        data: returnData,
    };
});
exports.TourService = {
    getAllTourFromDB,
    getSingleTour,
    createTourInDB,
    deleteTour,
    updateTourInDB,
    getTourGuides,
    toggleTourGuide,
};
