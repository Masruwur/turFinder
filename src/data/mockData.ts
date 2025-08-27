import ClubVolta from "../assets/turfs/clubvolta.png";
import GSP from "../assets/turfs/gsp.png";
import Jaff from "../assets/turfs/jaff.png";
import KickOff from "../assets/turfs/kickoff.png";
import Metroplex from "../assets/turfs/metroplex.png";
import NorthArena from "../assets/turfs/northarena.png";

export interface TurfData {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  distance: string;
  slot?: string; // Optional for games page
}

export const mockTurfs: TurfData[] = [
  {
    id: 1,
    name: "North Arena",
    location: "Sector-7, Uttara",
    rating: 4.8,
    price: 1500,
    slot: "5/10",
    image: NorthArena,
    distance: "0.5 km away",
  },
  {
    id: 2,
    name: "Club Volta",
    location: "Matikata Rd, Cantonment",
    rating: 4.6,
    price: 1200,
    slot: "5/10",
    image: ClubVolta,
    distance: "1.2 km away",
  },
  {
    id: 3,
    name: "Galacticos Sports Pavilion (GSP)",
    location: "Sector-15, Uttara",
    rating: 4.9,
    price: 1800,
    slot: "5/10",
    image: GSP,
    distance: "0.8 km away",
  },
  {
    id: 4,
    name: "Metroplex",
    location: "Khilkhet",
    rating: 4.5,
    price: 1000,
    slot: "5/10",
    image: Metroplex,
    distance: "2.1 km away",
  },
  {
    id: 5,
    name: "KickOff",
    location: "300 Feet Road, Purbachal",
    rating: 4.7,
    price: 1600,
    slot: "5/10",
    image: KickOff,
    distance: "1.5 km away",
  },
  {
    id: 6,
    name: "JAFF",
    location: "Bashundhara Gate",
    rating: 4.4,
    price: 2000,
    slot: "7/10",
    image: Jaff,
    distance: "3.2 km away",
  },
  {
    id: 7,
    name: "North Arena",
    location: "Sector-7, Uttara",
    rating: 4.8,
    price: 1500,
    slot: "10/10",
    image: NorthArena,
    distance: "0.5 km away",
  },
  {
    id: 8,
    name: "Club Volta",
    location: "Matikata Rd, Cantonment",
    rating: 4.6,
    price: 1200,
    slot: "1/10",
    image: ClubVolta,
    distance: "1.2 km away",
  },
  {
    id: 9,
    name: "Galacticos Sports Pavilion (GSP)",
    location: "Sector-15, Uttara",
    rating: 4.9,
    price: 1800,
    slot: "5/10",
    image: GSP,
    distance: "0.8 km away",
  },
];

// Additional mock data for future use
export const mockUsers = [
  {
    id: 1,
    name: "Rawnak Hossain",
    position: "CDM",
    team: "Toxic Pants",
    gamesPlayed: 4,
    avatar: "depto.jpeg",
    verified: true,
  },
];

export const mockBookings = [
  {
    id: 1,
    turfId: 1,
    userId: 1,
    date: "2025-08-28",
    timeSlot: "18:00-19:30",
    status: "confirmed",
    amount: 1500,
  },
];
