export interface Randi {
  id: number;
  name: string;
  age: number;
  location: string;
  distance: number; // in kilometers
  price: number; // hourly rate
  rating: number;
  services: string[];
  availability: 'Available Now' | 'Available Today' | 'Book in Advance';
  verified: boolean;
  featured: boolean;
  photo: string;
  description?: string;
  height?: string;
  weight?: string;
  measurements?: string;
  languages?: string[];
  nationality?: string;
}

// Sample data with all required fields
const randis: Randi[] = [
  {
    id: 1,
    name: "Sophia",
    age: 23,
    location: "Downtown Miami",
    distance: 3,
    price: 200,
    rating: 4.8,
    services: ["Massage", "GFE", "Dinner Date", "Travel Companion"],
    availability: "Available Now",
    verified: true,
    featured: true,
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    description: "Elegant and sophisticated companion for your exclusive events",
    height: "5'7\"",
    weight: "121 lbs",
    measurements: "34-24-36",
    languages: ["English", "Spanish"],
    nationality: "Brazilian"
  },
  {
    id: 2,
    name: "Isabella",
    age: 25,
    location: "South Beach",
    distance: 5,
    price: 250,
    rating: 4.9,
    services: ["Overnight", "Roleplay", "Travel Companion", "GFE"],
    availability: "Available Today",
    verified: true,
    featured: true,
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "VIP companion with a passion for adventure",
    height: "5'8\"",
    languages: ["English", "Portuguese"]
  },
  {
    id: 3,
    name: "Victoria",
    age: 28,
    location: "Brickell",
    distance: 8,
    price: 300,
    rating: 4.7,
    services: ["Massage", "Couples", "Dinner Date"],
    availability: "Book in Advance",
    verified: true,
    featured: false,
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
    description: "Luxury companion for discerning gentlemen",
    nationality: "Russian"
  },
  {
    id: 4,
    name: "Emma",
    age: 22,
    location: "North Miami",
    distance: 12,
    price: 180,
    rating: 4.5,
    services: ["GFE", "Dinner Date", "Massage"],
    availability: "Available Now",
    verified: false,
    featured: false,
    photo: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    name: "Luna",
    age: 24,
    location: "Coral Gables",
    distance: 15,
    price: 220,
    rating: 4.6,
    services: ["Overnight", "Travel Companion", "Couples"],
    availability: "Available Today",
    verified: true,
    featured: false,
    photo: "https://randomuser.me/api/portraits/women/5.jpg",
    languages: ["English", "French"]
  },
  {
    id: 6,
    name: "Mia",
    age: 27,
    location: "Aventura",
    distance: 20,
    price: 280,
    rating: 4.9,
    services: ["Massage", "GFE", "Roleplay", "BDSM"],
    availability: "Book in Advance",
    verified: true,
    featured: true,
    photo: "https://randomuser.me/api/portraits/women/6.jpg",
    description: "Elite companion for the most demanding tastes"
  },
  {
    id: 7,
    name: "Olivia",
    age: 29,
    location: "Miami Beach",
    distance: 6,
    price: 350,
    rating: 4.8,
    services: ["Dinner Date", "Travel Companion", "Overnight", "Couples"],
    availability: "Available Now",
    verified: true,
    featured: true,
    photo: "https://randomuser.me/api/portraits/women/7.jpg",
    nationality: "Italian"
  },
  {
    id: 8,
    name: "Ava",
    age: 26,
    location: "Little Havana",
    distance: 10,
    price: 200,
    rating: 4.4,
    services: ["Massage", "GFE", "Dinner Date"],
    availability: "Available Today",
    verified: false,
    featured: false,
    photo: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    id: 9,
    name: "Charlotte",
    age: 31,
    location: "Coconut Grove",
    distance: 18,
    price: 400,
    rating: 4.9,
    services: ["Travel Companion", "GFE", "Couples", "BDSM"],
    availability: "Book in Advance",
    verified: true,
    featured: true,
    photo: "https://randomuser.me/api/portraits/women/9.jpg",
    languages: ["English", "German"],
    nationality: "Swedish"
  },
  {
    id: 10,
    name: "Sofia",
    age: 25,
    location: "Downtown Miami",
    distance: 4,
    price: 280,
    rating: 4.7,
    services: ["Massage", "Roleplay", "Dinner Date", "GFE"],
    availability: "Available Now",
    verified: true,
    featured: false,
    photo: "https://randomuser.me/api/portraits/women/10.jpg",
    languages: ["English", "Spanish"],
    nationality: "Colombian"
  }
];

export default randis;
