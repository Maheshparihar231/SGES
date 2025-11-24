export interface Randi {
  id: number;
  name: string;
  age: number;
  location: string;
  distance: number; // in kilometers
  price: number; // hourly rate (USD)
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
  // Optional richer fields
  experienceYears?: number;
  verifiedBadge?: string; // e.g., 'Agency Verified', 'ID Verified'
  travelAvailable?: boolean;
  bookingLeadHours?: number; // lead time required to book
  availabilityNotes?: string; // short human readable availability details
  responseTimeHours?: number; // typical response time
  // Expanded profile fields for full profile page
  gallery?: string[];
  servicesDetailed?: { name: string; durationMinutes?: number; priceUSD?: number; note?: string }[];
  availabilitySchedule?: { day: string; from: string; to: string }[];
  lastSeenAt?: string; // ISO timestamp
  verifiedSteps?: string[]; // e.g., ['ID', 'Background', 'Agency']
  reviews?: { id: number; rating: number; text: string; date: string; clientName?: string }[];
  bookingContact?: { type: 'in_app' | 'phone' | 'email' | 'agent'; value?: string; agentId?: string };
  cancellationPolicy?: string;
  languagesDetailed?: { language: string; proficiency: string }[];
  packages?: { id: string; title: string; hours: number; price: number; description?: string }[];
  amenities?: Record<string, string | boolean>;
}

// Sample premium data with richer, human-friendly details
const randis: Randi[] = [
  {
    id: 1,
    name: "Sophia Marceau",
    age: 28,
    location: "Downtown Miami, Brickell area",
    distance: 3,
    price: 320,
    rating: 4.95,
    services: ["Dinner Companion", "GFE", "Relaxation Massage", "Travel Companion"],
    availability: "Available Now",
    verified: true,
    featured: true,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    description: "A refined and attentive companion for VIP evenings — excellent conversationalist, punctual, and discreet.",
    height: "5'8\"",
    weight: "128 lbs",
    measurements: "34-26-36",
    languages: ["English", "Spanish", "French"],
    nationality: "French",
    experienceYears: 6,
    verifiedBadge: "Agency Verified",
    travelAvailable: true,
    bookingLeadHours: 2,
    availabilityNotes: "Flexible evenings and weekend travel; same-day bookings often possible with short notice.",
    responseTimeHours: 1
    ,
    gallery: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80"
    ],
    servicesDetailed: [
      { name: "Dinner Companion", durationMinutes: 120, priceUSD: 320, note: "Polished conversation and accompaniment" },
      { name: "Relaxation Massage", durationMinutes: 60, priceUSD: 180 }
    ],
    availabilitySchedule: [
      { day: "Mon", from: "18:00", to: "23:00" },
      { day: "Fri", from: "18:00", to: "02:00" }
    ],
    lastSeenAt: "2025-11-24T09:15:00Z",
    verifiedSteps: ["ID Verified", "Agency Verified"],
    reviews: [
      { id: 101, rating: 5, text: "Impeccable company — extremely attentive.", date: "2025-10-12", clientName: "A. R." }
    ],
    bookingContact: { type: 'in_app' },
    cancellationPolicy: "48-hour notice for full refund; 24-hour notice 50% refund.",
    languagesDetailed: [ { language: 'English', proficiency: 'native' }, { language: 'French', proficiency: 'fluent' } ],
    packages: [ { id: 'p1', title: 'Evening + Dinner', hours: 3, price: 900, description: 'Dinner and extended companionship' } ],
    amenities: { smokes: false, petsAllowed: false }
  },
  {
    id: 2,
    name: "Isabella Rossi",
    age: 30,
    location: "South Beach, Miami",
    distance: 5,
    price: 450,
    rating: 4.99,
    services: ["Overnight", "VIP Events", "Private Dinner Companion", "City Tours"],
    availability: "Available Today",
    verified: true,
    featured: true,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
    description: "Polished and cosmopolitan — perfect for high-end events and travel. Discreet, well-traveled, and multilingual.",
    height: "5'9\"",
    languages: ["English", "Italian", "Portuguese"],
    nationality: "Italian",
    experienceYears: 8,
    verifiedBadge: "ID Verified",
    travelAvailable: true,
    bookingLeadHours: 24,
    availabilityNotes: "Available for overnight engagements and formal events with advance notice.",
    responseTimeHours: 4
    ,
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80",
      "https://images.unsplash.com/photo-1502630757992-49a9a60f6d63?w=1200&q=80"
    ],
    servicesDetailed: [
      { name: "Overnight", durationMinutes: 720, priceUSD: 1200, note: "Includes travel companion option" },
      { name: "VIP Events", durationMinutes: 180, priceUSD: 600 }
    ],
    availabilitySchedule: [ { day: "Sat", from: "18:00", to: "06:00" } ],
    lastSeenAt: "2025-11-23T20:40:00Z",
    verifiedSteps: ["ID Verified"],
    reviews: [ { id: 102, rating: 5, text: "World-class professionalism.", date: "2025-09-30" } ],
    bookingContact: { type: 'agent', agentId: 'agent_rossi' },
    cancellationPolicy: "Deposit required for overnight bookings; see agent for terms.",
    languagesDetailed: [ { language: 'English', proficiency: 'fluent' }, { language: 'Italian', proficiency: 'native' } ],
    packages: [ { id: 'p2', title: 'VIP Overnight', hours: 12, price: 2500 } ],
    amenities: { hotelVisits: true, travelCompanion: true }
  },
  {
    id: 3,
    name: "Victoria K.",
    age: 33,
    location: "Brickell — Private residence visits",
    distance: 8,
    price: 380,
    rating: 4.88,
    services: ["Couples", "Relaxation Massage", "Dinner Companion"],
    availability: "Book in Advance",
    verified: true,
    featured: false,
    photo: "https://images.unsplash.com/photo-1502630757992-49a9a60f6d63?w=800&q=80",
    description: "Elegant, experienced companion known for calm presence and exceptional client care. Ideal for longer bookings.",
    languages: ["English", "Russian"],
    nationality: "Russian",
    experienceYears: 10,
    verifiedBadge: "Agency Verified",
    travelAvailable: false,
    bookingLeadHours: 48,
    availabilityNotes: "Best availability on weekdays by appointment; accepts weekend bookings with 48-hour notice.",
    responseTimeHours: 12
    ,
    gallery: [ "https://images.unsplash.com/photo-1502630757992-49a9a60f6d63?w=1200&q=80" ],
    servicesDetailed: [ { name: "Couples", durationMinutes: 120, priceUSD: 400 } ],
    availabilitySchedule: [ { day: "Tue", from: "10:00", to: "18:00" } ],
    lastSeenAt: "2025-11-20T14:00:00Z",
    verifiedSteps: ["Agency Verified"],
    reviews: [ { id: 103, rating: 5, text: "Calm and professional.", date: "2025-08-05" } ],
    bookingContact: { type: 'in_app' },
    cancellationPolicy: "48-hour notice preferred.",
    languagesDetailed: [ { language: 'English', proficiency: 'native' }, { language: 'Russian', proficiency: 'native' } ],
    packages: [ { id: 'p3', title: 'Weekend Retreat', hours: 48, price: 8000 } ],
    amenities: { privateEvents: true }
  },
  {
    id: 4,
    name: "Emma Lee",
    age: 26,
    location: "North Miami / Sunny Isles",
    distance: 12,
    price: 220,
    rating: 4.7,
    services: ["GFE", "Dinner Companion", "Massage"],
    availability: "Available Now",
    verified: false,
    featured: false,
    photo: "https://images.unsplash.com/photo-1545996124-6d4c3b1d7c3b?w=800&q=80",
    description: "Warm and friendly with a relaxed style — great for casual evenings and short visits.",
    height: "5'6\"",
    languages: ["English"],
    experienceYears: 3,
    verifiedBadge: "",
    travelAvailable: false,
    bookingLeadHours: 4,
    availabilityNotes: "Typically available evenings and late afternoons.",
    responseTimeHours: 2
    ,
    gallery: [ "https://images.unsplash.com/photo-1545996124-6d4c3b1d7c3b?w=1200&q=80" ],
    servicesDetailed: [ { name: "GFE", durationMinutes: 60, priceUSD: 220 } ],
    availabilitySchedule: [ { day: "Thu", from: "17:00", to: "23:00" } ],
    lastSeenAt: "2025-11-24T07:30:00Z",
    verifiedSteps: [],
    reviews: [ { id: 104, rating: 4, text: "Very warm and friendly.", date: "2025-07-10" } ],
    bookingContact: { type: 'in_app' },
    cancellationPolicy: "24-hour notice for cancellations.",
    languagesDetailed: [ { language: 'English', proficiency: 'native' } ],
    packages: [ { id: 'p4', title: 'Quick Date', hours: 2, price: 440 } ],
    amenities: { smokes: false }
  },
  {
    id: 5,
    name: "Luna Alvarez",
    age: 29,
    location: "Coral Gables — Boutique hotel visits",
    distance: 15,
    price: 300,
    rating: 4.82,
    services: ["Overnight", "Travel Companion", "Couples"],
    availability: "Available Today",
    verified: true,
    featured: false,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    description: "Cultured and engaging — excellent for travel and longer engagements. Comfortable in formal settings.",
    languages: ["English", "French"],
    nationality: "Argentinian",
    experienceYears: 7,
    verifiedBadge: "ID Verified",
    travelAvailable: true,
    bookingLeadHours: 12,
    availabilityNotes: "Available afternoons and evenings; open to destination travel with advance notice.",
    responseTimeHours: 6
    ,
    gallery: [ "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80" ],
    servicesDetailed: [ { name: "Overnight", durationMinutes: 720, priceUSD: 900 } ],
    availabilitySchedule: [ { day: "Sun", from: "12:00", to: "23:00" } ],
    lastSeenAt: "2025-11-22T16:00:00Z",
    verifiedSteps: ["ID Verified"],
    reviews: [ { id: 105, rating: 5, text: "Very cultured and pleasant.", date: "2025-06-18" } ],
    bookingContact: { type: 'in_app' },
    cancellationPolicy: "Deposit refundable with 72-hour notice.",
    languagesDetailed: [ { language: 'French', proficiency: 'fluent' } ],
    packages: [ { id: 'p5', title: 'Travel Companion Day', hours: 8, price: 2200 } ],
    amenities: { hotelVisits: true }
  },
  {
    id: 6,
    name: "Mia Chen",
    age: 27,
    location: "Aventura / North Miami Beach",
    distance: 20,
    price: 360,
    rating: 4.9,
    services: ["Massage", "Private Events", "GFE"],
    availability: "Book in Advance",
    verified: true,
    featured: true,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
    description: "Professional, discreet, and highly rated for private events and VIP services.",
    experienceYears: 9,
    verifiedBadge: "Agency Verified",
    travelAvailable: true,
    bookingLeadHours: 24,
    availabilityNotes: "Available for VIP events and private bookings; please inquire about travel arrangements.",
    responseTimeHours: 8
    ,
    gallery: [ "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80" ],
    servicesDetailed: [ { name: "Private Events", durationMinutes: 240, priceUSD: 1500 } ],
    availabilitySchedule: [ { day: "Wed", from: "18:00", to: "23:00" } ],
    lastSeenAt: "2025-11-21T11:00:00Z",
    verifiedSteps: ["Agency Verified"],
    reviews: [ { id: 106, rating: 5, text: "Extremely professional.", date: "2025-05-09" } ],
    bookingContact: { type: 'agent', agentId: 'agency_mia' },
    cancellationPolicy: "Agency-handled cancellations; see agent.",
    languagesDetailed: [ { language: 'English', proficiency: 'fluent' } ],
    packages: [ { id: 'p6', title: 'VIP Event Package', hours: 6, price: 4000 } ],
    amenities: { travelCompanion: true }
  },
  {
    id: 7,
    name: "Olivia Martinez",
    age: 31,
    location: "Miami Beach — Luxury hotels only",
    distance: 6,
    price: 520,
    rating: 4.97,
    services: ["Dinner Companion", "Overnight", "Travel Companion", "Event Escort"],
    availability: "Available Now",
    verified: true,
    featured: true,
    photo: "https://images.unsplash.com/photo-1502630757992-49a9a60f6d63?w=800&q=80",
    description: "High-profile companion for elite events and international travel; extremely discreet and reliable.",
    languages: ["English", "Italian"],
    nationality: "Italian",
    experienceYears: 12,
    verifiedBadge: "Agency Verified",
    travelAvailable: true,
    bookingLeadHours: 48,
    availabilityNotes: "Available for international travel. Bookings require agency confirmation.",
    responseTimeHours: 24
    ,
    gallery: [ "https://images.unsplash.com/photo-1502630757992-49a9a60f6d63?w=1200&q=80" ],
    servicesDetailed: [ { name: "Event Escort", durationMinutes: 240, priceUSD: 1200 } ],
    availabilitySchedule: [ { day: "Mon", from: "18:00", to: "23:00" } ],
    lastSeenAt: "2025-11-18T06:00:00Z",
    verifiedSteps: ["Agency Verified"],
    reviews: [ { id: 107, rating: 5, text: "Outstanding discretion and grace.", date: "2025-04-22" } ],
    bookingContact: { type: 'agent', agentId: 'lux_agency_olivia' },
    cancellationPolicy: "Agency confirmation required; deposits non-refundable under 24 hours.",
    languagesDetailed: [ { language: 'Italian', proficiency: 'native' } ],
    packages: [ { id: 'p7', title: 'International Travel Companion', hours: 48, price: 12000 } ],
    amenities: { luxuryEventsOnly: true }
  },
  {
    id: 8,
    name: "Ava Torres",
    age: 26,
    location: "Little Havana — Neighborhood visits",
    distance: 10,
    price: 210,
    rating: 4.6,
    services: ["Massage", "GFE", "Dinner Companion"],
    availability: "Available Today",
    verified: false,
    featured: false,
    photo: "https://images.unsplash.com/photo-1545996124-6d4c3b1d7c3b?w=800&q=80",
    description: "Friendly and approachable — ideal for relaxed, casual meetups and short bookings.",
    languages: ["English", "Spanish"],
    experienceYears: 2,
    verifiedBadge: "",
    travelAvailable: false,
    bookingLeadHours: 3,
    availabilityNotes: "Typically available afternoons and early evenings.",
    responseTimeHours: 1
    ,
    gallery: [ "https://images.unsplash.com/photo-1545996124-6d4c3b1d7c3b?w=1200&q=80" ],
    servicesDetailed: [ { name: "Massage", durationMinutes: 60, priceUSD: 210 } ],
    availabilitySchedule: [ { day: "Sat", from: "14:00", to: "20:00" } ],
    lastSeenAt: "2025-11-24T08:20:00Z",
    verifiedSteps: [],
    reviews: [ { id: 108, rating: 4, text: "Very friendly and punctual.", date: "2025-03-11" } ],
    bookingContact: { type: 'in_app' },
    cancellationPolicy: "24-hour notice recommended.",
    languagesDetailed: [ { language: 'Spanish', proficiency: 'native' } ],
    packages: [ { id: 'p8', title: 'Afternoon Date', hours: 3, price: 630 } ],
    amenities: { neighborhoodVisits: true }
  },
  {
    id: 9,
    name: "Charlotte Berg",
    age: 35,
    location: "Coconut Grove — Private bookings",
    distance: 18,
    price: 600,
    rating: 5.0,
    services: ["Travel Companion", "VIP Events", "Couples"],
    availability: "Book in Advance",
    verified: true,
    featured: true,
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
    description: "Seasoned professional with impeccable references. Ideal for executive travel and luxury events.",
    languages: ["English", "German"],
    nationality: "Swedish",
    experienceYears: 15,
    verifiedBadge: "Background Checked",
    travelAvailable: true,
    bookingLeadHours: 72,
    availabilityNotes: "Advance bookings preferred for international travel.",
    responseTimeHours: 24
    ,
    gallery: [ "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80" ],
    servicesDetailed: [ { name: "Travel Companion", durationMinutes: 480, priceUSD: 600 } ],
    availabilitySchedule: [ { day: "Mon", from: "09:00", to: "18:00" } ],
    lastSeenAt: "2025-11-10T12:00:00Z",
    verifiedSteps: ["Background Checked"],
    reviews: [ { id: 109, rating: 5, text: "Impeccable references and attention to detail.", date: "2025-02-02" } ],
    bookingContact: { type: 'agent', agentId: 'exec_travel' },
    cancellationPolicy: "72-hour notice for international bookings.",
    languagesDetailed: [ { language: 'German', proficiency: 'fluent' } ],
    packages: [ { id: 'p9', title: 'Executive Travel', hours: 24, price: 14000 } ],
    amenities: { referencesAvailable: true }
  },
  {
    id: 10,
    name: "Sofia Delgado",
    age: 29,
    location: "Downtown Miami — Corporate area",
    distance: 4,
    price: 340,
    rating: 4.85,
    services: ["Dinner Companion", "Massage", "Roleplay"],
    availability: "Available Now",
    verified: true,
    featured: false,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    description: "Charismatic and attentive — equally comfortable at private dinners and casual outings.",
    languages: ["English", "Spanish"],
    nationality: "Colombian",
    experienceYears: 5,
    verifiedBadge: "ID Verified",
    travelAvailable: false,
    bookingLeadHours: 6,
    availabilityNotes: "Available for short notice daytime and evening bookings.",
    responseTimeHours: 2
    ,
    gallery: [ "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80" ],
    servicesDetailed: [ { name: "Dinner Companion", durationMinutes: 120, priceUSD: 340 } ],
    availabilitySchedule: [ { day: "Wed", from: "17:00", to: "23:00" } ],
    lastSeenAt: "2025-11-24T06:45:00Z",
    verifiedSteps: ["ID Verified"],
    reviews: [ { id: 110, rating: 5, text: "Friendly and very attentive.", date: "2025-01-15" } ],
    bookingContact: { type: 'in_app' },
    cancellationPolicy: "48-hour notice for a full refund.",
    languagesDetailed: [ { language: 'Spanish', proficiency: 'native' } ],
    packages: [ { id: 'p10', title: 'Corporate Evening', hours: 4, price: 1200 } ],
    amenities: { corporateAreaFriendly: true }
  }
];

export default randis;
