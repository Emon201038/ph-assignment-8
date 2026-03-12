export interface IDestination {
  id: string;
  name: string;
  city: string;
  country: string;
  image: string;
  description: string;
  overview: string; // explain the destination
  attractions: IAttraction[];
  category: string;
  lat: number;
  lng: number;
  rating: number;
  averageCost: number;
  bestSeason: string[]; // first element will be consider as peak season
  continent: string;
  currency: string;
  languages: string[];
  transportation: string; // comma separated details
  createdAt: Date;
  updatedAt: Date;
}

export interface IAttraction {
  id: string;
  name: string;
  image: string;
  description: string;
}
