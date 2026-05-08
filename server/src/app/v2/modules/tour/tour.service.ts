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
  payload: CreateTourInput,
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

    imageUrl = result.url;
  }

  if (!imageUrl) {
    throw new AppError(400, "Image upload failed");
  }

  // Create tour
  const { tour: result } = await prisma.$transaction(async (tnx) => {
    const tour = await tnx.tour.create({
      data: {
        title,
        description,
        destinationId,
        category: category.toUpperCase() as TourCategory,
        priceFrom,
        image: imageUrl,
        slug: tourSlug,
        durationDays,
        maxGroupSize,
        difficulty: TourDifficulty.MODERATE,
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

    const tourGuides = await tnx.tour_Guide.createMany({
      data: payload.guides.map((guideId) => ({
        tourId: tour.id,
        guideId,
      })),
    });

    return {
      tour,
      tourGuides,
    };
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
  const { category, difficulty, destinationId, guides = [], ...body } = payload;

  const slug = slugify(payload.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let imageUrl: string | undefined;

  // Upload image only if new file exists
  if (file) {
    const uploadedRes = await uploadFileToCloudinary(file, "tour-buddy/tours");

    if (!uploadedRes?.url) {
      throw new AppError(400, "Image upload failed");
    }

    imageUrl = uploadedRes.url;
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedTour = await tx.tour.update({
      where: { id },
      data: {
        ...body,
        slug,
        category: category as TourCategory,
        difficulty: difficulty as TourDifficulty,

        destination: {
          connect: { id: destinationId },
        },

        ...(imageUrl && { image: imageUrl }),
      },
    });

    await tx.tour_Guide.deleteMany({
      where: {
        tourId: id,
        guideId: {
          notIn: guides,
        },
      },
    });

    const existingGuides = await tx.tour_Guide.findMany({
      where: {
        tourId: id,
      },
      select: {
        guideId: true,
      },
    });

    const existingGuideIds = existingGuides.map((guide) => guide.guideId);

    const newGuideIds = guides.filter(
      (guideId) => !existingGuideIds.includes(guideId),
    );

    if (newGuideIds.length > 0) {
      await tx.tour_Guide.createMany({
        data: newGuideIds.map((guideId) => ({
          tourId: id,
          guideId,
        })),
        skipDuplicates: true,
      });
    }

    return updatedTour;
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

  const result = await prisma.tour_Guide.findMany({
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
  return result.map((g) => ({ ...g.guide }));
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
