import { CloudDrizzle, SunIcon } from "lucide-react";

interface WeatherData {
  temperature: number;
  season: string;
  description: string;
  months: string;
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

export function parseMonthRange(range: string) {
  const [start, end] = range.split(" to ");

  return {
    startMonth: monthMap[start],
    endMonth: monthMap[end],
  };
}

const getWeatherForRange = async (lat: number, lng: number, range: string) => {
  const { startMonth, endMonth } = parseMonthRange(range);

  const year = new Date().getFullYear() - 1;

  const startDate = `${year}-${String(startMonth > endMonth ? endMonth : startMonth).padStart(2, "0")}-01`;
  const endDate = `${year}-${String(startMonth > endMonth ? startMonth : endMonth).padStart(2, "0")}-28`;

  console.log(startDate, endDate, range);
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lng}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Allow-Origin": "*",
    },
    cache: "force-cache",
  });
  const data = await res.json();

  const temps = data.daily.temperature_2m_max;
  const rain = data.daily.precipitation_sum;

  const avgTemp =
    temps.reduce((a: number, b: number) => a + b, 0) / temps.length;

  const rainyDays = rain.filter((r: number) => r > 0).length;

  return {
    avgTemp: Math.round(avgTemp),
    season: rainyDays > 10 ? "Wet Season" : "Dry Season",
    description: rainyDays > 10 ? "Rainy & Humid" : "Sunny & Dry",
  };
};

export default async function WeatherCard({
  lat,
  lng,
  monthRange,
}: {
  lat: number;
  lng: number;
  monthRange: string[];
}) {
  if (monthRange.length === 0) return null;
  const range = monthRange[0] + " to " + monthRange[monthRange.length - 1];
  const data = await getWeatherForRange(lat, lng, range);
  return (
    <div className="rounded-2xl bg-primary text-white p-6 shadow-xl shadow-primary/20">
      <h3 className="text-xl font-bold mb-4">Best Time to Visit</h3>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {data?.season === "Dry Season" ? <SunIcon /> : <CloudDrizzle />}
          <div>
            <p className="text-3xl font-black">{data.avgTemp}°C</p>
            <p className="text-white/80 text-sm uppercase font-bold tracking-wider">
              {data.season}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm py-2 border-t border-white/20">
          <span>{range}</span>
          <span className="font-bold">{data.description}</span>
        </div>
      </div>
    </div>
  );
}
