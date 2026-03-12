import { Prisma } from "../../../../../prisma/generated/client";
import prisma from "../../../config/db";
import {
  IOptionResult,
  paginationHelper,
} from "../../../helpers/paginationHelper";
import { destinationSearchableField } from "./destination.constant";

const getDestinationsFromDb = async (
  options: Record<string, string>,
  filters: Record<string, string>,
) => {
  const { limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.DestinationWhereInput[] = [];
  if (filters.searchTerm) {
    andConditions.push({
      OR: destinationSearchableField.map((field) => ({
        [field]: {
          contains: filters.searchTerm,
          mode: "insensitive",
        },
      })),
    });
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
  const destinations = await prisma.destination.findMany({
    where: {
      AND: andConditions,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const meta = {
    total: await prisma.destination.count(),
    page: Number(options.page) || 1,
    limit: Number(options.limit) || 10,
  };
  return {
    meta,
    destinations,
  };
};

const getSingleDestination = async (id: string) => {
  const destination = await prisma.destination.findUnique({
    where: {
      id,
    },
    include: {
      attractions: true,
    },
  });
  return destination;
};

const getNearbyDestinations = async (
  lat: number,
  lng: number,
  radius = 1000,
) => {
  const destinations = await prisma.$queryRawUnsafe(`
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

  if (!destinations || (destinations as any[]).length === 0) {
    const fallback = await prisma.destination.findMany({
      take: 2,
      orderBy: {
        rating: "desc",
      },
    });

    return fallback;
  }

  return destinations;
};

export const DestinationService = {
  getDestinationsFromDb,
  getSingleDestination,
  getNearbyDestinations,
};
