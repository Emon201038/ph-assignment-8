import { Prisma } from "../../../../../prisma/generated/client";
import prisma from "../../../config/db";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { destinationSearchableField } from "./destination.constant";
import AppError from "../../../helpers/appError";
import { uploadFileToCloudinary } from "../../../utils/upload-files";
import { CreateDestinationInput } from "./destination.validation";

const getDestinationsFromDb = async (
  options: Record<string, string>,
  filters: Record<string, string>,
) => {
  const { limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.DestinationWhereInput[] = [];

  andConditions.push({
    isDeleted: false,
  });

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
  const destinations = await prisma.destination.findMany({
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
          [sortBy]: sortOrder as "asc" | "desc", // cast to Prisma SortOrder
        },
    include: {
      _count: {
        select: { tours: true }, // only count tours, don't fetch all tour data
      },
    },
  });

  // Map to include tourCount
  const destinationsWithTourCount = destinations.map((dest) => ({
    ...dest,
    tourCount: dest._count.tours,
  }));

  const meta = {
    total: await prisma.destination.count({
      where: { AND: andConditions },
    }),
    page: Number(options.page) || 1,
    limit: Number(options.limit) || 10,
  };

  return {
    meta,
    destinations: destinationsWithTourCount,
  };
};

const createDestinationInDB = async (
  payload: CreateDestinationInput,
  image: Express.Multer.File,
) => {
  if (!image) {
    throw new AppError(400, "Destination image is required");
  }

  const imageUpload = await uploadFileToCloudinary(
    image,
    "tour-buddy/destinations",
  );

  if (!imageUpload?.url) {
    throw new AppError(400, "Image upload failed");
  }

  const result = await prisma.destination.create({
    data: {
      ...payload,
      image: imageUpload.url,
    },
    include: {
      attractions: true,
    },
  });

  return result;
};

const getSingleDestination = async (id: string) => {
  const destination = await prisma.destination.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      attractions: true,
    },
  });
  return destination;
};

const updateDestinationInDB = async (
  id: string,
  payload: CreateDestinationInput,
  file?: Express.Multer.File,
) => {
  let imageUrl: string | undefined;

  if (file) {
    const uploadedRes = await uploadFileToCloudinary(
      file,
      "tour-buddy/destinations",
    );

    if (!uploadedRes?.url) {
      throw new AppError(400, "Image upload failed");
    }

    imageUrl = uploadedRes.url;
  }

  const result = await prisma.destination.update({
    where: {
      id,
    },
    data: {
      ...payload,
      ...(imageUrl && { image: imageUrl }),
    },
    include: {
      attractions: true,
    },
  });

  return result;
};

const softDeleteDestinationInDB = async (id: string) => {
  const result = await prisma.destination.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  return result;
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
    WHERE "isDeleted" = false
  ) AS d
  WHERE distance < ${radius}
  ORDER BY distance
  LIMIT 2
`);

  if (!destinations || (destinations as any[]).length === 0) {
    const fallback = await prisma.destination.findMany({
      take: 2,
      where: {
        isDeleted: false,
      },
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
  createDestinationInDB,
  getSingleDestination,
  updateDestinationInDB,
  softDeleteDestinationInDB,
  getNearbyDestinations,
};
