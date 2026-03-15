"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTripsData = generateTripsData;
exports.getRandomGuides = getRandomGuides;
exports.generateTripDates = generateTripDates;
exports.getTripIncludesForTour = getTripIncludesForTour;
const uuid_1 = require("uuid");
// Helper function to generate random future dates
function generateTripDates(durationDays) {
    const today = new Date();
    const daysOffset = Math.floor(Math.random() * 90) + 5; // Start 5-95 days from now
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + daysOffset);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationDays - 1);
    return { startDate, endDate };
}
// Helper function to get random guides (excluding the tour creator)
function getRandomGuides(excludeId) {
    const guideIds = [
        "8dba4c63-6668-467c-915e-c3b33dbdb8a8",
        "7d19444c-8c28-40b8-9b14-18274925bc93",
        "a408a3ec-370b-4b2b-9a5d-b6ff2f7b82c0",
        "3b004266-f7b4-4aa8-ad9b-9114e65894b1",
        "f74642a4-6b7f-45de-a9c4-1803fd375506",
        "06d34926-9d4e-406a-911c-ffc7da9b48c3",
        "7ecb5949-8a5c-48d5-a438-49079307624f",
        "cdeb5d5b-bd19-49d6-ac2c-46fc3c014ef5",
        "08f30381-5cc7-4e77-816a-b77681c517ed",
        "028274fd-47de-4960-b929-b14183a0c3d4",
        "5c2b2efa-c09e-44e2-ac24-b73a59e627c7",
        "d14f1f96-0dbc-4fbc-9ced-9d2be1f6e1cb",
        "555aa87e-2350-4217-954e-3e2c5729bfb5",
        "fa6365d8-a372-439f-acb9-3348a3b8f38b",
        "55dcbb07-889d-4c8d-a15b-46eee65cdc1d",
        "3daf380f-609f-4bd9-91f1-90a8a59fa07f",
        "f971ae6b-ee93-4f14-abc1-113eff2fa947",
        "6cdb2a18-3fbe-481f-a6b0-fc00153a2e3f",
    ];
    const filtered = guideIds.filter((id) => id !== excludeId);
    return filtered;
}
// Trip includes mapping by tour category
function getTripIncludesForTour(category) {
    const categoryIncludes = {
        BEACH: [
            "c7e08a5c-8ed2-4d6e-bed7-de7dac7d7e14", // Beach Activities
            "abbea1c8-d7aa-408c-bb67-070ab8293d61", // Snorkeling
            "cdcb406e-a36d-472c-a715-7a7c994f088a", // Airport Pickup
            "c4de0a2d-26e7-4de7-93cf-0846a77282fe", // Breakfast Included
            "436ceb89-b6c5-4c04-b098-a9edb191a303", // Lunch Included
            "fa5ec95e-88d3-4a29-acdf-61bfe0a0cd9e", // Professional Guide
        ],
        ADVENTURE: [
            "474c8e5e-acec-4005-9338-b9b861bbf143", // Hiking
            "02e229bc-a1ea-46cb-81e6-c73d2533a63c", // Safari Experience
            "2a2d45aa-3ace-413c-b927-cb3a6fe38e67", // Scuba Diving
            "8de93f4e-53cf-4eff-96e5-58e5ca75b077", // Local Transportation
            "5571e057-0bf8-40af-a8dc-682a061fe411", // All Meals Included
        ],
        CULTURE: [
            "6d25f202-9f6c-4afd-a6d1-5fb515c13f05", // City Tour
            "feb82e1b-7066-4d0b-8046-9838cb86a6a4", // Museum Visit
            "c5de43eb-9456-47e7-80d8-012769dffc44", // Local Food Tasting
            "46f68d11-bab6-4e71-99d2-29038839a39a", // Local Guide
            "0b218b4d-69be-49a1-9271-b79234221ec3", // Dinner Included
        ],
        CITY: [
            "6d25f202-9f6c-4afd-a6d1-5fb515c13f05", // City Tour
            "cdcb406e-a36d-472c-a715-7a7c994f088a", // Airport Pickup
            "9e85cdcd-bdb1-4440-ad4b-99e47708922f", // Airport Drop-off
            "8de93f4e-53cf-4eff-96e5-58e5ca75b077", // Local Transportation
            "28c1762c-ba55-45bd-8b3d-de2a9b989a51", // Nightlife Tour
        ],
        NATURE: [
            "474c8e5e-acec-4005-9338-b9b861bbf143", // Hiking
            "02e229bc-a1ea-46cb-81e6-c73d2533a63c", // Safari Experience
            "1e778474-eb18-4934-abc1-02862ea1bfad", // Boat Ride
            "fa5ec95e-88d3-4a29-acdf-61bfe0a0cd9e", // Professional Guide
            "5571e057-0bf8-40af-a8dc-682a061fe411", // All Meals Included
        ],
        FOOD: [
            "c5de43eb-9456-47e7-80d8-012769dffc44", // Local Food Tasting
            "5571e057-0bf8-40af-a8dc-682a061fe411", // All Meals Included
            "6d25f202-9f6c-4afd-a6d1-5fb515c13f05", // City Tour
            "46f68d11-bab6-4e71-99d2-29038839a39a", // Local Guide
            "2176e486-de61-4f57-bb00-7635ef5ab795", // Private Transport
        ],
        NIGHTLIFE: [
            "28c1762c-ba55-45bd-8b3d-de2a9b989a51", // Nightlife Tour
            "0744cace-7556-4700-9030-ca8079399b2d", // Welcome Drink
            "cdcb406e-a36d-472c-a715-7a7c994f088a", // Airport Pickup
            "2176e486-de61-4f57-bb00-7635ef5ab795", // Private Transport
            "0b218b4d-69be-49a1-9271-b79234221ec3", // Dinner Included
        ],
    };
    return categoryIncludes[category] || [];
}
// Generate trips for each tour
function generateTripsData(toursData) {
    const trips = [];
    const tripIncludes = [];
    for (const tour of toursData) {
        // Generate 2-5 trips per tour
        const tripsPerTour = Math.floor(Math.random() * 4) + 2; // Random between 2-5
        for (let i = 0; i < tripsPerTour; i++) {
            const tripId = (0, uuid_1.v4)();
            const { startDate, endDate } = generateTripDates(tour.durationDays);
            // Get random guide from available guides (not the tour creator if possible)
            const availableGuides = getRandomGuides(tour.createdById);
            const guideId = availableGuides[Math.floor(Math.random() * availableGuides.length)];
            // Calculate price with some variation (+/- 10-30%)
            const priceVariation = Math.random() * 0.2 + 0.1; // 10-30%
            const priceAdjustment = Math.random() > 0.5 ? priceVariation : -priceVariation;
            const tripPrice = Math.round(tour.priceFrom * (1 + priceAdjustment));
            trips.push({
                id: tripId,
                tourId: tour.id,
                guideId: guideId,
                startDate: startDate,
                endDate: endDate,
                price: tripPrice,
                maxGuests: tour.maxGroupSize,
                bookedSeats: 0,
                status: "SCHEDULED",
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            // Get includes for this tour category
            const includeIds = getTripIncludesForTour(tour.category);
            // Create trip include items (2-4 per trip)
            const numIncludes = Math.floor(Math.random() * 3) + 2; // 2-4 includes
            const selectedIncludes = includeIds
                .sort(() => Math.random() - 0.5)
                .slice(0, numIncludes);
            for (const tripIncludeId of selectedIncludes) {
                tripIncludes.push({
                    id: (0, uuid_1.v4)(),
                    tripId: tripId,
                    tripIncludeId: tripIncludeId,
                });
            }
        }
    }
    return { trips, tripIncludes };
}
