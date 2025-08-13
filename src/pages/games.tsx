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

export default function Games() {
  const searchRef = useRef<HTMLDivElement>(null);

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
      slot: "5/10",
      image: Jaff,
      distance: "3.2 km away",
    },
    {
      id: 7,
      name: "North Arena",
      location: "Sector-7, Uttara",
      rating: 4.8,
      price: 1500,
      slot: "5/10",
      image: NorthArena,
      distance: "0.5 km away",
    },
    {
      id: 8,
      name: "Club Volta",
      location: "Matikata Rd, Cantonment",
      rating: 4.6,
      price: 1200,
      slot: "5/10",
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
  return (
    <div className="min-h-screen bg-almostblack text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Header />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <aside className="order-1 lg:order-none lg:sticky lg:top-6">
            <ProfileCard />
          </aside>

          <main className="order-2">
            <GalleryGrid turfs={mockTurfs} />
          </main>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between">
      <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-300">
        <a
          className="hover:text-white"
          href="#">
          Search
        </a>
      </nav>
    </header>
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
          <button
            className="rounded-2xl border border-neutral-700 px-4 py-2.5 text-neutral-200 hover:bg-neutral-800"
            aria-label="Message">
            <MessageIcon className="h-5 w-5" />
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
        <h3 className="text-lg font-semibold text-neutral-200">Explore</h3>
        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800">
            Latest
          </button>
          <button className="rounded-xl border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800">
            Popular
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
        <button className="rounded-lg border border-neutral-800 px-3 py-1 hover:bg-neutral-800">
          View
        </button>
      </div>
    </article>
  );
}

/* ---- tiny inline icons (no deps) ---- */
function VerifiedBadge() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-green-500"
      aria-label="Verified">
      <path d="M12 2 9.9 4.6 6.8 3.9 6.1 7 3.5 9.1 6.1 11.2 6.8 14.3 9.9 13.6 12 16.2 14.1 13.6 17.2 14.3 17.9 11.2 20.5 9.1 17.9 7 17.2 3.9 14.1 4.6z" />
      <path
        className="fill-white"
        d="M10.3 11.8 8.7 10.2l-1 1 2.6 2.6 5-5-1-1z"
      />
    </svg>
  );
}

function UsersIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor">
      <path d="M16 11a4 4 0 1 0-3.999-4A4 4 0 0 0 16 11Zm-8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm8 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm-8 1c-2.21 0-6 1.12-6 3v2h6v-2c0-.7.22-1.35.6-1.94A7.43 7.43 0 0 1 8 14Z" />
    </svg>
  );
}

function FilesIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v14h2V4h8V2Zm4 4h-6a2 2 0 0 0-2 2v14l5-3 5 3V8a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

function MessageIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor">
      <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden>
      <path d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" />
    </svg>
  );
}

function LogoStar() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-white"
      fill="currentColor"
      aria-hidden>
      <path d="M12 2 9 9 2 12l7 3 3 7 3-7 7-3-7-3-3-7z" />
    </svg>
  );
}
