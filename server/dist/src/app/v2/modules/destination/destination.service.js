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
exports.DestinationService = void 0;
const db_1 = __importDefault(require("../../../config/db"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const destination_constant_1 = require("./destination.constant");
const getDestinationsFromDb = (options, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, sortBy, sortOrder, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const andConditions = [];
    if (filters.searchTerm) {
        andConditions.push({
            OR: destination_constant_1.destinationSearchableField.map((field) => ({
                [field]: {
                    contains: filters.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (filters.popular) {
        // For "popular", we will later order by tour count
        // No need to add a WHERE condition; we'll order by tour count
    }
    if (filters.date) {
        const month = new Date(filters.date).toLocaleDateString("en-US", {
            month: "long",
        });
        andConditions.push({
            bestSeason: {
                has: month,
            },
        });
    }
    // Fetch destinations along with their tour counts
    const destinations = yield db_1.default.destination.findMany({
        where: {
            AND: andConditions,
        },
        skip,
        take: limit,
        orderBy: filters.popular
            ? {
                tours: {
                    _count: "desc", // always descending for popular
                },
            }
            : {
                [sortBy]: sortOrder, // cast to Prisma SortOrder
            },
        include: {
            _count: {
                select: { tours: true }, // only count tours, don't fetch all tour data
            },
        },
    });
    // Map to include tourCount
    const destinationsWithTourCount = destinations.map((dest) => (Object.assign(Object.assign({}, dest), { tourCount: dest._count.tours })));
    const meta = {
        total: yield db_1.default.destination.count({
            where: { AND: andConditions },
        }),
        page: Number(options.page) || 1,
        limit: Number(options.limit) || 10,
    };
    return {
        meta,
        destinations: destinationsWithTourCount,
    };
});
const getSingleDestination = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const destination = yield db_1.default.destination.findUnique({
        where: {
            id,
        },
        include: {
            attractions: true,
        },
    });
    return destination;
});
const getNearbyDestinations = (lat_1, lng_1, ...args_1) => __awaiter(void 0, [lat_1, lng_1, ...args_1], void 0, function* (lat, lng, radius = 1000) {
    const destinations = yield db_1.default.$queryRawUnsafe(`
  SELECT *
  FROM (
    SELECT *,
      (
        6371 * acos(
          cos(radians(${lat})) *
          cos(radians(lat)) *
          cos(radians(lng) - radians(${lng})) +
          sin(radians(${lat})) *
          sin(radians(lat))
        )
      ) AS distance
    FROM "Destination"
  ) AS d
  WHERE distance < ${radius}
  ORDER BY distance
  LIMIT 2
`);
    console.log(destinations);
    if (!destinations || destinations.length === 0) {
        const fallback = yield db_1.default.destination.findMany({
            take: 2,
            orderBy: {
                rating: "desc",
            },
        });
        return fallback;
    }
    return destinations;
});
exports.DestinationService = {
    getDestinationsFromDb,
    getSingleDestination,
    getNearbyDestinations,
};
