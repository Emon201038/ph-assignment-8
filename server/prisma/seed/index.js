"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../src/app/config/db"));
const trips_1 = require("./trips");
function getContinent(country) {
    const map = {
        Indonesia: "Asia",
        France: "Europe",
        UAE: "Asia",
        Japan: "Asia",
        Maldives: "Asia",
        Italy: "Europe",
        Thailand: "Asia",
        Turkey: "Europe",
        "South Africa": "Africa",
        USA: "North America",
        Spain: "Europe",
        Australia: "Australia",
        Brazil: "South America",
        Greece: "Europe",
        Singapore: "Asia",
        UK: "Europe",
        Netherlands: "Europe",
        Peru: "South America",
        "Czech Republic": "Europe",
        Iceland: "Europe",
        Canada: "North America",
        "South Korea": "Asia",
        "New Zealand": "Australia",
        Morocco: "Africa",
        Argentina: "South America",
        Egypt: "Africa",
        China: "Asia",
        Vietnam: "Asia",
        Taiwan: "Asia",
    };
    return map[country] || "Unknown";
}
function getCurrency(country) {
    const map = {
        Indonesia: "Indonesian Rupiah",
        France: "Euro",
        UAE: "UAE Dirham",
        Japan: "Japanese Yen",
        Maldives: "Maldivian Rufiyaa",
        Italy: "Euro",
        Thailand: "Thai Baht",
        Turkey: "Turkish Lira",
        USA: "US Dollar",
        Spain: "Euro",
        Australia: "Australian Dollar",
        Brazil: "Brazilian Real",
        Greece: "Euro",
        Singapore: "Singapore Dollar",
        UK: "British Pound",
        Netherlands: "Euro",
        Canada: "Canadian Dollar",
        Morocco: "Moroccan Dirham",
        Egypt: "Egyptian Pound",
        Vietnam: "Vietnamese Dong",
        China: "Chinese Yuan",
    };
    return map[country] || "Local Currency";
}
function getLanguages(country) {
    const map = {
        Indonesia: ["Indonesian"],
        France: ["French"],
        UAE: ["Arabic", "English"],
        Japan: ["Japanese"],
        Maldives: ["Dhivehi"],
        Italy: ["Italian"],
        Thailand: ["Thai"],
        Turkey: ["Turkish"],
        USA: ["English"],
        Spain: ["Spanish"],
        Australia: ["English"],
        Brazil: ["Portuguese"],
        Greece: ["Greek"],
        Singapore: ["English", "Malay", "Chinese"],
        UK: ["English"],
        Netherlands: ["Dutch"],
        Canada: ["English", "French"],
        Morocco: ["Arabic", "French"],
        Egypt: ["Arabic"],
        Vietnam: ["Vietnamese"],
        China: ["Chinese"],
    };
    return map[country] || ["Local Language"];
}
function generateAttractions(city) {
    return [
        {
            name: `${city} Central Landmark`,
            image: `https://picsum.photos/seed/${city}1/800/600`,
            description: `One of the most popular tourist attractions in ${city}.`,
        },
        {
            name: `${city} Historic District`,
            image: `https://picsum.photos/seed/${city}2/800/600`,
            description: `A historic area showcasing culture and architecture.`,
        },
        {
            name: `${city} Scenic Viewpoint`,
            image: `https://picsum.photos/seed/${city}3/800/600`,
            description: `A beautiful location offering scenic views of the city.`,
        },
    ];
}
const monthMap = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
};
const numberToMonth = Object.fromEntries(Object.entries(monthMap).map(([k, v]) => [v, k]));
function expandMonthRange(range) {
    // e.g. "March to May"
    const [start, , end] = range.split(" ");
    const startMonth = monthMap[start];
    const endMonth = monthMap[end];
    const months = [];
    for (let m = startMonth; m <= endMonth; m++) {
        months.push(numberToMonth[m]);
    }
    return months;
}
const updates = [
    {
        id: "4d45ccd6-785c-4180-933b-aefd360e36fb",
        url: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "4c2ac684-157b-4156-9d60-67ab50d63a85",
        url: "https://images.unsplash.com/photo-1612730871336-d48d0840b2b8?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "285e33e2-8cd6-4d65-9055-3ed684cd4923",
        url: "https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "14ccd086-575b-4652-8fcf-3fa2d36a7f91",
        url: "https://images.unsplash.com/photo-1516428990200-c1bc16655610?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "26e19eb5-2208-43f4-ae2a-099d2b8e7b80",
        url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "9479a15a-8956-4283-a0da-87a116222fc0",
        url: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "371bc4ca-98d0-4c1a-a0c8-02be85eda4fe",
        url: "https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "16c4d012-ff84-4414-a991-06db15da1b1b",
        url: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "3cff3119-50e8-4507-ae3b-1dfb79feca02",
        url: "https://images.unsplash.com/photo-1579606030105-081438908f51?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "cb9fd6fb-bc8d-4bff-91c0-17a2cd37127d",
        url: "https://images.unsplash.com/photo-1512100356956-c1d47cee4981?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "86422d65-2e71-4ab5-a3a0-c628b0a18774",
        url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "f69541c5-4e82-4c7c-b3bc-60e55312d395",
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "d1d1ac0f-f58d-4b77-9b4d-c67de2b7268b",
        url: "https://images.unsplash.com/photo-1521319220054-94c34a2c2621?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "4ab4692e-6a4f-4f41-b7ef-e5cb61487072",
        url: "https://images.unsplash.com/photo-1496886008898-0c622a450e1d?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "074b9b78-8a6f-480f-9791-3c42cbb7a49e",
        url: "https://images.unsplash.com/photo-1506509618585-1d488c9f5647?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "0e2aa0f8-7509-4747-a787-b122f42531e5",
        url: "https://images.unsplash.com/photo-1542158097-909249764516?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "4465c0d6-43aa-4b3b-bb37-204f186111ac",
        url: "https://images.unsplash.com/photo-1510410714152-7cd0c4c47bb6?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "0da472f8-2298-44c8-b79e-da804a835c54",
        url: "https://images.unsplash.com/photo-1541079366657-3a18012b1860?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: "732345da-d5a2-4d69-9df4-92fdf6e47521",
        url: "https://images.unsplash.com/photo-1516483638261-f40af5aa11ce?auto=format&fit=crop&q=80&w=1000",
    },
];
async function main() {
    // ========== OLD SEEDING CODE (COMMENTED OUT) ==========
    // Uncomment the sections below to re-seed the database with initial data
    // await prisma.user.create({
    //   data: {
    //     name: "Admin One",
    //     email: "admin@tourbuddy.com",
    //     password: await bcrypt.hash("admin123@#", 10),
    //     role: "ADMIN",
    //     country: "Bangladesh",
    //     city: "Cumilla",
    //   },
    // });
    // for (const { languages, specialties, aboutMe, ...g } of guides) {
    //   const rating = Number((Math.random() * (5 - 4) + 4).toFixed(1));
    //   await prisma.user.create({
    //     data: {
    //       ...g,
    //       password: await bcrypt.hash(g.password, 10),
    //       guideProfile: {
    //         create: {
    //           rating: rating,
    //           hourlyRate: Math.round(Math.random() * (40 - 20) + 20),
    //           experience: Math.floor(Math.random() * (10 - 3) + 3),
    //           aboutMe: aboutMe,
    //           specialties: specialties,
    //           languages: languages,
    //           isTopRated: rating >= 4.6,
    //         },
    //       },
    //     },
    //   });
    // }
    // for (const t of travelers) {
    //   await prisma.user.create({
    //     data: {
    //       ...t,
    //       password: await bcrypt.hash(t.password, 10),
    //     },
    //   });
    // }
    // for (let index = 0; index < toursData.length; index++) {
    //   const { itineraries, ...tour } = toursData[index];
    //   await prisma.tour.create({
    //     data: {
    //       ...tour,
    //       itineraries: {
    //         createMany: {
    //           data: itineraries.createMany,
    //         },
    //       },
    //     },
    //   });
    // }
    // ========== TRIPS SEEDING (MAIN) ==========
    console.log("Generating trips data...");
    const tours = await db_1.default.tour.findMany({});
    const { trips, tripIncludes: tripIncludeItems } = (0, trips_1.generateTripsData)(tours);
    console.log(`Creating ${trips.length} trips...`);
    for (const trip of trips) {
        await db_1.default.trip.create({
            data: trip,
        });
    }
    console.log(`Creating ${tripIncludeItems.length} trip include items...`);
    for (const tripIncludeItem of tripIncludeItems) {
        await db_1.default.tripIncludeItem.create({
            data: tripIncludeItem,
        });
    }
    // console.log("Updating broken image URLs...");
    // for (const tour of updates) {
    //   await prisma.tour.update({
    //     where: { id: tour.id },
    //     data: { image: tour.url }, // Change 'imageUrl' to 'image' if that is your schema field name
    //   });
    // }
    console.log("Seed completed successfully!");
}
main()
    .then(() => {
    console.log("Seed completed");
    db_1.default.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await db_1.default.$disconnect();
    process.exit(1);
});
