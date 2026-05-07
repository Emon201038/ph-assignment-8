import slugify from "slugify";
import {
  Prisma,
  TourCategory,
  TourDifficulty,
} from "../../../../../prisma/generated/client";
import prisma from "../../../config/db";
import { paginationHelper } from "../../../helpers/paginationHelper";
import AppError from "../../../helpers/appError";
import { uploadFileToCloudinary } from "../../../utils/upload-files";
import { CreateTourInput } from "./tour.validation";

const getAllTourFromDB = async (options: any, filters: any) => {
  const { limit, skip, page, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { searchTerm, category, country, city, minPrice, maxPrice, language } =
    filters;

  const andConditions: Prisma.TourWhereInput[] = [];
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

    const lang = await prisma.destination.groupBy({
      by: ["languages"],
    });

    const mainarr = lang.map((i) => i.languages).flatMap((i) => i);
    const unique = mainarr.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );
  }

  const whereConditions: Prisma.TourWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.tour.findMany({
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

  const total = await prisma.tour.count({
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

const getSingleTour = async (id: string, isSlug = false) => {
  if (!isSlug) {
    const result = await prisma.tour.findUnique({
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
    return {
      ...result,
      trips: result?.trips.map((trip) => ({
        ...trip,
        includes: trip.includes.map((include) => include.tripInclude),
      })),
    };
  } else {
    const result = await prisma.tour.findUnique({
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
    return {
      ...result,
      trips: result?.trips.map((trip) => ({
        ...trip,
        includes: trip.includes.map((include) => include.tripInclude),
      })),
    };
  }
};

const createTourInDB = async (
  payload: any,
  userId: string,
  image: Express.Multer.File,
) => {
  const {
    title,
    description,
    destinationId,
    category,
    priceFrom,
    durationDays,
    maxGroupSize,
    language,
  } = payload;

  // Validate destination exists
  const destinationExists = await prisma.destination.findUnique({
    where: { id: destinationId },
  });

  if (!destinationExists) {
    throw new AppError(404, "Destination not found");
  }

  const tourSlug = slugify(title, { lower: true, strict: true, trim: true });

  let imageUrl: string = "";
  if (image) {
    const result = await uploadFileToCloudinary(image, "tour-buddy/tours");
    if (!result?.url) {
      throw new AppError(400, "Image upload failed");
    }

    console.log(result);
    imageUrl = result.url;
  }

  if (!imageUrl) {
    throw new AppError(400, "Image upload failed");
  }

  // Create tour
  const result = await prisma.tour.create({
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
      difficulty: TourDifficulty.MODERATE,
      createdById: userId,
      language,
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
};

const deleteTour = async (id: string) => {
  const result = await prisma.tour.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateTourInDB = async (
  id: string,
  payload: CreateTourInput,
  file?: Express.Multer.File,
) => {
  const { category, difficulty, destinationId, ...body } = payload;

  const slug = slugify(payload.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let imageUrl: string | undefined;

  if (file) {
    const uploadedRes = await uploadFileToCloudinary(file, "tour-buddy/tours");
    if (!uploadedRes?.url) {
      throw new AppError(400, "Image upload failed");
    }
    imageUrl = uploadedRes.url;
  }

  const result = await prisma.tour.update({
    where: { id },
    data: {
      ...body,
      slug,
      destination: {
        connect: { id: destinationId },
      },
      category: category as TourCategory,
      difficulty: difficulty as TourDifficulty,
      ...(imageUrl && { image: imageUrl }),
    },
  });

  return result;
};

const getTourGuides = async (tourId: string, searchTerm?: string) => {
  let whereConditions: Prisma.Tour_GuideWhereInput[] = [
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

  console.log(whereConditions);

  const result = await prisma.tour_Guide.findMany({
    where: { AND: whereConditions },
    take: 10,
    select: {
      guide: {
        select: {
          name: true,
          phone: true,
          city: true,
          avatar: true,
        },
      },
    },
  });
  return result;
};

const toggleTourGuide = async (tourId: string, guideId: string) => {
  const isExists = await prisma.tour_Guide.findUnique({
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
    returnData = await prisma.tour_Guide.delete({
      where: {
        tourId_guideId: {
          guideId,
          tourId,
        },
      },
    });
    message = "Guide removed from tour successfully";
  } else {
    returnData = await prisma.tour_Guide.create({
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
};

export const TourService = {
  getAllTourFromDB,
  getSingleTour,
  createTourInDB,
  deleteTour,
  updateTourInDB,
  getTourGuides,
  toggleTourGuide,
};
