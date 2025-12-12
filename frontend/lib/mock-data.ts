import { UserRole } from "@/interfaces/user";

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
export const mockGuides: User[] = [
  {
    id: "1",
    name: "Maria Santos",
    email: "maria@example.com",
    role: UserRole.GUIDE,
    bio: "Born and raised in Lisbon, I love sharing the hidden gems of my city",
    profilePic: "/woman-smiling-guide.jpg",
    languages: ["English", "Portuguese", "Spanish"],
    expertise: ["Food & Wine", "History", "Photography"],
    dailyRate: 150,
    rating: 4.9,
    toursGiven: 247,
  },
  {
    id: "2",
    name: "Takeshi Yamamoto",
    email: "takeshi@example.com",
    role: UserRole.GUIDE,
    bio: "Tokyo local specializing in traditional culture and modern street food",
    profilePic: "/smiling-japanese-man.png",
    languages: ["English", "Japanese"],
    expertise: ["Food", "Culture", "Nightlife"],
    dailyRate: 180,
    rating: 5.0,
    toursGiven: 189,
  },
  {
    id: "3",
    name: "Sophie Laurent",
    email: "sophie@example.com",
    role: UserRole.GUIDE,
    bio: "Parisian art historian with a passion for hidden galleries and cafes",
    profilePic: "/french-woman-smiling.jpg",
    languages: ["English", "French", "Italian"],
    expertise: ["Art", "History", "Shopping"],
    dailyRate: 165,
    rating: 4.8,
    toursGiven: 312,
  },
];

export const mockTours: Tour[] = [
  {
    id: "1",
    title: "Hidden Jazz Bars of New Orleans",
    description:
      "Explore the authentic jazz scene beyond Bourbon Street. Visit local haunts where real musicians play, learn about jazz history, and enjoy complimentary drinks at select venues.",
    guideId: "1",
    guideName: "Marcus Johnson",
    guideAvatar: "/jazz-musician.png",
    city: "New Orleans",
    country: "USA",
    category: "Nightlife",
    price: 120,
    duration: "4 hours",
    maxGroupSize: 8,
    meetingPoint: "Jackson Square",
    images: [
      "/new-orleans-jazz-bar.jpg",
      "/bourbon-street-night.jpg",
      "/jazz-musician-playing.jpg",
    ],
    rating: 4.9,
    reviewCount: 127,
    languages: ["English"],
  },
  {
    id: "2",
    title: "Street Food Paradise Walk",
    description:
      "Taste your way through Tokyo's best street food with a local foodie. Sample takoyaki, yakitori, ramen, and seasonal specialties while learning about Japanese food culture.",
    guideId: "2",
    guideName: "Takeshi Yamamoto",
    guideAvatar: "/smiling-japanese-man.png",
    city: "Tokyo",
    country: "Japan",
    category: "Food",
    price: 95,
    duration: "3.5 hours",
    maxGroupSize: 6,
    meetingPoint: "Shibuya Crossing",
    images: [
      "/tokyo-street-food.png",
      "/steaming-ramen.png",
      "/shibuya-night.jpg",
    ],
    rating: 5.0,
    reviewCount: 203,
    languages: ["English", "Japanese"],
  },
  {
    id: "3",
    title: "Secret Gardens & Artist Studios",
    description:
      "Discover Paris away from tourist crowds. Visit hidden gardens, meet working artists in their studios, and explore charming neighborhoods locals love.",
    guideId: "3",
    guideName: "Sophie Laurent",
    guideAvatar: "/french-woman-smiling.jpg",
    city: "Paris",
    country: "France",
    category: "Art",
    price: 140,
    duration: "5 hours",
    maxGroupSize: 10,
    meetingPoint: "Pont des Arts",
    images: [
      "/paris-hidden-garden.jpg",
      "/artist-studio-paris.jpg",
      "/paris-streets.jpg",
    ],
    rating: 4.8,
    reviewCount: 156,
    languages: ["English", "French", "Italian"],
  },
  {
    id: "4",
    title: "Sunset Photography Adventure",
    description:
      "Capture Barcelona's golden hour with a professional photographer. Learn composition, lighting, and editing while visiting the most photogenic spots.",
    guideId: "1",
    guideName: "Carlos Rodriguez",
    guideAvatar: "/photographer-smiling.jpg",
    city: "Barcelona",
    country: "Spain",
    category: "Photography",
    price: 110,
    duration: "3 hours",
    maxGroupSize: 5,
    meetingPoint: "Plaça de Catalunya",
    images: [
      "/barcelona-sunset.jpg",
      "/sagrada-familia.png",
      "/barcelona-beach.png",
    ],
    rating: 4.9,
    reviewCount: 89,
    languages: ["English", "Spanish", "Catalan"],
  },
  {
    id: "5",
    title: "Historic Pub Crawl & Stories",
    description:
      "Experience London's pub culture with tales of history, literature, and local legends. Visit 5 historic pubs with complimentary first drink.",
    guideId: "2",
    guideName: "James McCarthy",
    guideAvatar: "/british-man-pub.jpg",
    city: "London",
    country: "UK",
    category: "History",
    price: 75,
    duration: "3.5 hours",
    maxGroupSize: 12,
    meetingPoint: "Trafalgar Square",
    images: [
      "/london-pub-interior.jpg",
      "/british-pub-culture.jpg",
      "/london-street-night.jpg",
    ],
    rating: 4.7,
    reviewCount: 241,
    languages: ["English"],
  },
  {
    id: "6",
    title: "Spice Market & Cooking Class",
    description:
      "Explore Istanbul's colorful spice markets, then cook authentic Turkish dishes in a local home. Take home recipes and spices.",
    guideId: "3",
    guideName: "Aylin Demir",
    guideAvatar: "/placeholder.svg?height=100&width=100",
    city: "Istanbul",
    country: "Turkey",
    category: "Food",
    price: 130,
    duration: "6 hours",
    maxGroupSize: 8,
    meetingPoint: "Grand Bazaar Main Entrance",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    rating: 5.0,
    reviewCount: 178,
    languages: ["English", "Turkish", "German"],
  },
];

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
