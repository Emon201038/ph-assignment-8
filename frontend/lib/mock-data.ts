import { UserRole } from "@/interfaces/user.interface";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bio?: string;
  profilePic?: string;
  languages?: string[];
  expertise?: string[];
  dailyRate?: number;
  rating?: number;
  toursGiven?: number;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  guideId: string;
  guideName: string;
  guideAvatar?: string;
  city: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  maxGroupSize: number;
  meetingPoint: string;
  images: string[];
  rating: number;
  reviewCount: number;
  languages: string[];
}

export interface Booking {
  id: string;
  tourId: string;
  touristId: string;
  guideId: string;
  date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalPrice: number;
}

export interface Review {
  id: string;
  tourId: string;
  guideId: string;
  touristId: string;
  touristName: string;
  touristAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock data

export const mockReviews: Review[] = [
  {
    id: "1",
    tourId: "1",
    guideId: "1",
    touristId: "t1",
    touristName: "Sarah Johnson",
    touristAvatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    comment:
      "Marcus was incredible! He took us to places I never would have found on my own. The jazz was authentic and the stories were fascinating.",
    date: "2024-11-15",
  },
  {
    id: "2",
    tourId: "2",
    guideId: "2",
    touristId: "t2",
    touristName: "David Chen",
    touristAvatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    comment:
      "Best food tour ever! Takeshi knows all the hidden gems and the food was absolutely delicious. Worth every penny.",
    date: "2024-11-10",
  },
  {
    id: "3",
    tourId: "3",
    guideId: "3",
    touristId: "t3",
    touristName: "Emma Williams",
    touristAvatar: "/placeholder.svg?height=50&width=50",
    rating: 5,
    comment:
      "Sophie showed us a side of Paris tourists never see. The artist studios were amazing and the gardens were so peaceful.",
    date: "2024-11-08",
  },
];

export const categories = [
  "Food & Wine",
  "History",
  "Art",
  "Adventure",
  "Photography",
  "Nightlife",
  "Shopping",
  "Nature",
];

export const cities = [
  {
    name: "Tokyo",
    country: "Japan",
    image: "/images/tokyo.jpeg",
  },
  {
    name: "Paris",
    country: "France",
    image: "/images/paris.jpeg",
  },
  {
    name: "New York",
    country: "USA",
    image: "/images/newyork.jpg",
  },
  {
    name: "Barcelona",
    country: "Spain",
    image: "/images/barcelona.jpeg",
  },
  {
    name: "London",
    country: "UK",
    image: "/images/london.jpeg",
  },
  {
    name: "Istanbul",
    country: "Turkey",
    image: "/images/istanbul.jpeg",
  },
];

export const mockTours = [
  {
    id: "1",
    title: "Historic City Walking Tour",
    location: "Paris, France",
    price: 89,
    duration: "3 hours",
    rating: 4.9,
    reviews: 245,
    image: "/paris-eiffel-tower-streets.jpg",
    description:
      "Explore the charming streets of Paris with a knowledgeable local guide who will share fascinating stories about the city's rich history.",
    itinerary: [
      { time: "9:00 AM", activity: "Meet at Notre-Dame Cathedral" },
      { time: "9:30 AM", activity: "Walk through Latin Quarter" },
      { time: "10:30 AM", activity: "Visit Sainte-Chapelle" },
      { time: "11:30 AM", activity: "Coffee break at local café" },
      { time: "12:00 PM", activity: "End at Île de la Cité" },
    ],
    category: "cultural",
  },
  {
    id: "2",
    title: "Mountain Hiking Adventure",
    location: "Swiss Alps, Switzerland",
    price: 120,
    duration: "5 hours",
    rating: 4.8,
    reviews: 189,
    image: "/swiss-alps-mountain-hiking.jpg",
    description:
      "Experience breathtaking views as you hike through pristine alpine meadows with an expert mountain guide.",
    itinerary: [
      { time: "7:00 AM", activity: "Depart from base camp" },
      { time: "8:00 AM", activity: "Begin ascent through forest trail" },
      { time: "10:00 AM", activity: "Reach alpine meadow viewpoint" },
      { time: "11:30 AM", activity: "Lunch with panoramic views" },
      { time: "12:00 PM", activity: "Descent back to base camp" },
    ],
    category: "adventure",
  },
  {
    id: "3",
    title: "Culinary Food Tour",
    location: "Tokyo, Japan",
    price: 95,
    duration: "4 hours",
    rating: 4.9,
    reviews: 312,
    image: "/tokyo-street-food-market.jpg",
    description:
      "Discover authentic Japanese cuisine as you visit local markets and hidden restaurants known only to locals.",
    itinerary: [
      { time: "11:00 AM", activity: "Meet at Tsukiji Outer Market" },
      { time: "11:30 AM", activity: "Sample fresh sushi" },
      { time: "12:30 PM", activity: "Visit traditional tea house" },
      { time: "2:00 PM", activity: "Explore ramen alley" },
      { time: "3:00 PM", activity: "Dessert at local wagashi shop" },
    ],
    category: "food",
  },
  {
    id: "4",
    title: "Coastal Sunset Cruise",
    location: "Santorini, Greece",
    price: 150,
    duration: "3 hours",
    rating: 5.0,
    reviews: 428,
    image: "/santorini-sunset-boat-cruise.jpg",
    description:
      "Sail along the stunning Santorini coastline and witness the world-famous sunset from the best vantage point.",
    itinerary: [
      { time: "5:00 PM", activity: "Board at Ammoudi Bay" },
      { time: "5:30 PM", activity: "Sail past volcanic islands" },
      { time: "6:30 PM", activity: "Swimming and snorkeling stop" },
      { time: "7:30 PM", activity: "Sunset viewing with drinks" },
      { time: "8:00 PM", activity: "Return to port" },
    ],
    category: "leisure",
  },
];

export const mockGuides = [
  {
    id: "1",
    name: "Sophie Laurent",
    location: "Paris, France",
    rating: 4.9,
    reviews: 187,
    languages: ["English", "French", "Spanish"],
    experience: "8 years",
    bio: "Born and raised in Paris, I have a deep passion for sharing the hidden gems of my beloved city. From art history to culinary secrets, I love showing visitors the authentic Parisian experience.",
    avatar: "/woman-guide-profile.jpg",
    available: true,
    specialties: ["History", "Art", "Food"],
    price: 75,
    completedTours: 312,
  },
  {
    id: "2",
    name: "Marco Rossi",
    location: "Rome, Italy",
    rating: 4.8,
    reviews: 203,
    languages: ["English", "Italian"],
    experience: "6 years",
    bio: "As an archaeologist turned tour guide, I bring ancient Roman history to life. My tours are perfect for history enthusiasts who want to understand the stories behind the ruins.",
    avatar: "/man-guide-profile.jpg",
    available: false,
    specialties: ["History", "Architecture"],
    price: 80,
    completedTours: 268,
  },
  {
    id: "3",
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    rating: 5.0,
    reviews: 156,
    languages: ["English", "Japanese", "Korean"],
    experience: "5 years",
    bio: "I specialize in culinary tours and cultural experiences. Let me introduce you to the best local restaurants and teach you about Japanese traditions.",
    avatar: "/asian-woman-guide-profile.jpg",
    available: true,
    specialties: ["Food", "Culture"],
    price: 70,
    completedTours: 234,
  },
  {
    id: "4",
    name: "Alex Thompson",
    location: "Swiss Alps, Switzerland",
    rating: 4.9,
    reviews: 142,
    languages: ["English", "German", "French"],
    experience: "10 years",
    bio: "Mountain enthusiast and certified guide with a decade of experience leading alpine adventures. Safety and unforgettable experiences are my priorities.",
    avatar: "/man-mountain-guide-profile.jpg",
    available: true,
    specialties: ["Adventure", "Nature"],
    price: 95,
    completedTours: 421,
  },
];

export const mockBookings = [
  {
    id: "1",
    tourId: "1",
    tourTitle: "Historic City Walking Tour",
    date: "2024-03-15",
    status: "upcoming",
    guideId: "1",
    guideName: "Sophie Laurent",
    price: 89,
  },
  {
    id: "2",
    tourId: "3",
    tourTitle: "Culinary Food Tour",
    date: "2024-03-20",
    status: "upcoming",
    guideId: "3",
    guideName: "Yuki Tanaka",
    price: 95,
  },
  {
    id: "3",
    tourId: "2",
    tourTitle: "Mountain Hiking Adventure",
    date: "2024-02-10",
    status: "completed",
    guideId: "4",
    guideName: "Alex Thompson",
    price: 120,
  },
];

export const mockUsers = [
  {
    id: "1",
    name: "John Traveler",
    role: "tourist" as const,
    email: "john@example.com",
    avatar: "/man-tourist-profile.jpg",
    bio: "Adventure seeker and culture enthusiast. Always looking for authentic local experiences.",
    joinedDate: "2023-05-12",
    location: "New York, USA",
  },
  {
    id: "2",
    name: "Sophie Laurent",
    role: "guide" as const,
    email: "sophie@example.com",
    avatar: "/woman-guide-profile.jpg",
    bio: "Born and raised in Paris, I have a deep passion for sharing the hidden gems of my beloved city.",
    joinedDate: "2020-03-20",
    location: "Paris, France",
    guideInfo: mockGuides[0],
  },
  {
    id: "3",
    name: "Admin User",
    role: "admin" as const,
    email: "admin@localguide.com",
    avatar: "/admin-profile.jpg",
    bio: "Platform administrator managing the LocalGuide community.",
    joinedDate: "2019-01-01",
    location: "San Francisco, USA",
  },
];
