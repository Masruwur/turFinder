"useclient";
import React, { useState, useRef } from "react";
import depto from "../assets/depto.jpeg";
import { BadgeCheck } from "lucide-react";
import ClubVolta from "../assets/turfs/clubvolta.png";
import GSP from "../assets/turfs/gsp.png";
import Jaff from "../assets/turfs/jaff.png";
import KickOff from "../assets/turfs/kickoff.png";
import Metroplex from "../assets/turfs/metroplex.png";
import NorthArena from "../assets/turfs/northarena.png";
import NavBar from "../components/NavBar";
import SearchIcon from "../assets/icons/search.svg";

interface SlotCardData {
  id: number;
  name: string;
  location: string;
  rating: number;
  slot: string;
  price: number;
  image: string;
  distance: string;
}
const mockTurfs: SlotCardData[] = [
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

export default function Games() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter turfs based on search term
  const filteredTurfs = mockTurfs.filter(
    (turf) =>
      turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turf.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Header
          turfs={mockTurfs}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchRef={searchRef}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <aside className="order-1 lg:order-none lg:sticky lg:top-6">
            <ProfileCard />
          </aside>

          <main className="order-2">
            <GalleryGrid turfs={filteredTurfs} />
          </main>
        </div>
      </div>
    </div>
  );
}

function Header({
  turfs,
  searchTerm,
  setSearchTerm,
  searchRef,
}: {
  turfs: SlotCardData[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={searchRef}
      className="mb-8">
      <div className="relative max-w-lg ml-auto">
        {/* Search icon positioned absolutely inside input */}
        <img
          src={SearchIcon}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7"
        />
        <input
          type="text"
          placeholder="Search for a turf"
          value={searchTerm}
          onChange={(input) => setSearchTerm(input.target.value)}
          className="w-full pl-13 pr-4 py-4 text-lg rounded-2xl transition-colors duration-300
                         bg-gray-700 focus:outline-none focus:ring-2
                         font-redhatmono text-white"
        />
      </div>
    </div>
  );
}

function ProfileCard() {
  const [following, setFollowing] = useState(false);

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={depto}
          alt="Profile"
          className="h-56 w-full object-cover sm:h-72"
        />
      </div>

      <div className="mt-4 sm:mt-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Rawnak Hossain</h2>
          <BadgeCheck className="fill-white text-black" />
        </div>
        <p className="mt-1 text-neutral-400 font-redhatmono">CDM</p>
        <p className="mt-1 text-neutral-400 font-redhatmono">Toxic Pants</p>

        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() => setFollowing((f) => !f)}
            className="flex-1 rounded-2xl bg-white text-neutral-900 px-4 py-2.5 font-medium hover:opacity-90 active:opacity-80">
            {following ? "Following" : "Follow"} <span aria-hidden>＋</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function GalleryGrid({ turfs }: { turfs: SlotCardData[] }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800">
            slots
          </button>
          <button className="rounded-xl border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800">
            price
          </button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {turfs.map((t) => (
          <SlotCard
            key={t.id}
            turf={t}
          />
        ))}
      </div>
    </>
  );
}

function SlotCard({ turf }: { turf: SlotCardData }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={turf.image}
          alt={turf.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 w-full p-4">
          <h4 className="text-base font-semibold text-white drop-shadow">
            {turf.name}
          </h4>
          <p className="text-xs text-neutral-300">
            {turf.location} • {turf.distance}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-sm text-neutral-300">
        <span className="inline-flex items-center gap-2">৳ {turf.price}</span>
        <span className="rounded-lg border border-neutral-800 px-3 py-1 hover:bg-neutral-800">
          {turf.slot}
        </span>
      </div>
    </article>
  );
}
