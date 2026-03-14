import { Prisma } from "../../../../../prisma/generated/client";
import prisma from "../../../config/db";
import { paginationHelper } from "../../../helpers/paginationHelper";
import AppError from "../../../helpers/appError";

const getTripInclude = async (filters: Record<string, string>) => {
  const andConditions: Prisma.TripIncludeWhereInput[] = [];
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
  const tripIncludes = await prisma.tripInclude.findMany({
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
};

const getAllTripsFromDB = async (options: any, filters: any) => {
  const { limit, skip, page, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { searchTerm, status, tourId, guideId, minPrice, maxPrice } = filters;

  const andConditions: Prisma.TripWhereInput[] = [];

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

  const whereConditions: Prisma.TripWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.trip.findMany({
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

  const total = await prisma.trip.count({
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
};

const getSingleTrip = async (id: string) => {
  const result = await prisma.trip.findUnique({
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
    throw new AppError(404, "Trip not found");
  }

  return {
    ...result,
    includes: result.includes.map((include) => include.tripInclude),
  };
};

const createTripInDB = async (
  payload: Prisma.TripCreateInput & { tourId: string; guideId: string },
) => {
  const { tourId, guideId, startDate, endDate, price, maxGuests, includes } =
    payload;

  // Validate tour exists
  const tourExists = await prisma.tour.findUnique({
    where: { id: tourId as string },
  });

  if (!tourExists) {
    throw new AppError(404, "Tour not found");
  }

  // Validate guide exists if provided
  if (guideId) {
    const guideExists = await prisma.user.findUnique({
      where: { id: guideId as string },
    });

    if (!guideExists) {
      throw new AppError(404, "Guide not found");
    }
  }

  // Validate dates
  const startDateObj = new Date(startDate as string | Date);
  const endDateObj = new Date(endDate as string | Date);

  if (startDateObj >= endDateObj) {
    throw new AppError(400, "Start date must be before end date");
  }

  if (startDateObj < new Date()) {
    throw new AppError(400, "Start date must be in the future");
  }

  // Create trip
  const result = await prisma.trip.create({
    data: {
      tourId: tourId as string,
      guideId: guideId as string | null,
      startDate: startDateObj,
      endDate: endDateObj,
      price: price as number,
      maxGuests: maxGuests as number,
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
};

export const TripService = {
  getTripInclude,
  getAllTripsFromDB,
  getSingleTrip,
  createTripInDB,
};
