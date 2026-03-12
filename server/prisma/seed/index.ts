import prisma from "../../src/app/config/db";
import { destinations } from "./destination";

function getContinent(country: string) {
  const map: Record<string, string> = {
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

function getCurrency(country: string) {
  const map: Record<string, string> = {
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

function getLanguages(country: string): string[] {
  const map: Record<string, string[]> = {
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

function generateAttractions(city: string) {
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

const monthMap: Record<string, number> = {
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

const numberToMonth: Record<number, string> = Object.fromEntries(
  Object.entries(monthMap).map(([k, v]) => [v, k]),
);

function expandMonthRange(range: string): string[] {
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

async function main() {
  const destinations = await prisma.destination.findMany({
    select: {
      id: true,
      bestSeason: true,
    },
  });

  for (const destination of destinations) {
    const months = expandMonthRange(destination.bestSeason[0]);
    await prisma.destination.update({
      where: {
        id: destination.id,
      },
      data: {
        bestSeason: months,
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seed completed");
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
