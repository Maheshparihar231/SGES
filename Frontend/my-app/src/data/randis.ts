export interface Randi {
  id: number;
  name: string;
  location: string;
  availability: 'Available' | 'Busy';
  photo: string;
}

// Create the typed array
const randis: Randi[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    availability: "Available",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Anjali Verma",
    location: "Mumbai",
    availability: "Busy",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Ritu Singh",
    location: "Bangalore",
    availability: "Available",
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Neha Gupta",
    location: "Kolkata",
    availability: "Available",
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Simran Kaur",
    location: "Chandigarh",
    availability: "Busy",
    photo: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    name: "Pooja Patel",
    location: "Ahmedabad",
    availability: "Available",
    photo: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    name: "Sonal Joshi",
    location: "Pune",
    availability: "Available",
    photo: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: 8,
    name: "Megha Agarwal",
    location: "Jaipur",
    availability: "Busy",
    photo: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    name: "Kavita Mishra",
    location: "Lucknow",
    availability: "Available",
    photo: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: 10,
    name: "Shweta Jain",
    location: "Hyderabad",
    availability: "Available",
    photo: "https://randomuser.me/api/portraits/women/10.jpg",
  }
];

export default randis;
