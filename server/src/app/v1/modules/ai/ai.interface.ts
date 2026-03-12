export interface TripRequest {
  prompt: string;
}

export interface ExtractedTripInfo {
  destination: string;
  days: number;
  budget?: number | string;
  interests: string[];
}

export interface DayPlan {
  day: number;
  activities: string[];
}

export interface TripPlan {
  destination: string;
  days: number;
  estimatedBudget?: number;
  itinerary: DayPlan[];
  tips: string[];
}
