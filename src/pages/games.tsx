import { useState, useRef } from "react";
import depto from "../assets/depto.jpeg";
import { BadgeCheck } from "lucide-react";
import NavBar from "../components/NavBar";
import SearchIcon from "../assets/icons/search.svg";
import { mockTurfs, TurfData } from "../data/mockData";

// Type alias for games page specific data structure
interface SlotCardData extends TurfData {
  slot: string; // Required for games page
}

export default function Games() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Cast mockTurfs to SlotCardData since all our mock data has slot values
  const turfsWithSlots = mockTurfs as SlotCardData[];

  // Filter turfs based on search term
  const filteredTurfs = turfsWithSlots.filter(
    (turf) =>
      turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turf.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-800 px-5 py-25 text-neutral-100">
      <div
        style={{
          position: "fixed",
          inset: -1,
          zIndex: 0,
          backgroundImage:
            "repeating-linear-gradient(to right, #262626 0px, #262626 1px, transparent 1px, transparent 100px), repeating-linear-gradient(to bottom, #262626 0px, #262626 1px, transparent 1px, transparent 100px)",
          backgroundSize: "60px 60px",
        }}
      />
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Header row with title and search */}
        <div className="flex items-center justify-between mb-6 ml-2 gap-2">
          <h1
            ref={titleRef}
            className={`font-polysans font-bold text-white tracking-tight transition-all 
              duration-300 ease-in-out transform origin-left ${
                isSearchExpanded ? "scale-80  text-md" : "scale-100  text-3xl"
              } whitespace-nowrap overflow-hidden`}>
            FIND GAMES!
          </h1>

          <Header
            turfs={turfsWithSlots}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchRef={searchRef}
            titleRef={titleRef}
            isSearchExpanded={isSearchExpanded}
            setIsSearchExpanded={setIsSearchExpanded}
          />
        </div>

        <div className="mt-5 flex flex-col lg:flex-row gap-6">
          <aside className="order-1 lg:order-none lg:sticky lg:top-6 lg:w-[300px] lg:flex-shrink-0">
            <ProfileCard />
          </aside>

          <main className="order-2 z-5">
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
  titleRef,
  isSearchExpanded,
  setIsSearchExpanded,
}: {
  turfs: SlotCardData[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  isSearchExpanded: boolean;
  setIsSearchExpanded: (expanded: boolean) => void;
}) {
  return (
    <div
      ref={searchRef}
      className="flex items-center">
      {/* Desktop search bar */}
      <div className="hidden md:block relative w-80">
        <img
          src={SearchIcon}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-7"
        />
        <input
          type="text"
          placeholder="find games now"
          value={searchTerm}
          onChange={(input) => setSearchTerm(input.target.value)}
          className="w-full pl-13 pr-4 py-4 text-md rounded-2xl
                         bg-gray-700 focus:outline-none focus:ring-2
                         font-redhatmono text-white"
        />
      </div>

      {/* Mobile search - responsive and mobile-first */}
      <div className="md:hidden">
        <div
          className={`relative transition-all duration-300 ease-out ${
            isSearchExpanded ? "" : "w-12"
          }`}>
          <div className="relative h-12 bg-darkgreen rounded-2xl">
            {/* Search icon */}
            <div
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
              onClick={() => !isSearchExpanded && setIsSearchExpanded(true)}>
              <img
                src={SearchIcon}
                className="w-6 h-6"
                alt="Search"
              />
            </div>

            {/* Search input */}
            {isSearchExpanded && (
              <input
                type="text"
                placeholder="find games now"
                value={searchTerm}
                onChange={(input) => setSearchTerm(input.target.value)}
                onBlur={() => {
                  if (!searchTerm) setIsSearchExpanded(false);
                }}
                autoFocus
                className="w-full h-full pl-12 pr-10 bg-transparent rounded-2xl
                         focus:outline-none focus:ring-2 focus:ring-gray-500
                         font-redhatmono text-white text-sm"
              />
            )}

            {/* Close button */}
            {isSearchExpanded && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setIsSearchExpanded(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                         text-gray-400 hover:text-white text-lg">
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCard() {
  const [following, setFollowing] = useState(false);

  return (
    <div
      className="rounded-3xl border border-neutral-800 bg-neutral-900
      relative z-10
      p-4 sm:p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="flex gap-4">
        <div className="overflow-hidden rounded-2xl flex-shrink-0 items-center">
          <img
            src={depto}
            alt="Profile"
            className="w-20 h-20 rounded-2xl object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Rawnak Hossain</h2>
              <BadgeCheck className="fill-white text-black w-4 h-4" />
            </div>
            <p className=" text-neutral-400 font-redhatmono text-sm">CDM</p>
            <p className="text-neutral-400 font-redhatmono text-sm">
              Toxic Pants
            </p>
            <div className="font-redhatmono text-sm text-yellow pt-0.5">
              <span className="text-white">4</span> games played
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryGrid({ turfs }: { turfs: SlotCardData[] }) {
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-2 font-redhatmono ml-auto">
          <button
            className="rounded-xl border border-neutral-800 px-3 
          py-1.5 text-sm text-neutral-300 hover:bg-neutral-800
          active:bg-green/55 transition-all duration-200
          ">
            slots
          </button>
          <button
            className="rounded-xl border border-neutral-800 px-3 py-1.5 
          text-sm text-neutral-300 hover:bg-neutral-800
          active:bg-green/55 transition-all duration-200
          ">
            price
          </button>
          <button
            className="rounded-xl border border-neutral-800 px-3 py-1.5 
          text-sm text-neutral-300 hover:bg-neutral-800
          active:bg-green/55 transition-all duration-200
          ">
            distance
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
    <article className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 relative z-10">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
        <img
          src={turf.image}
          alt={turf.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card content section */}
      <div className="p-4 space-y-2">
        {/* Title and location */}
        <div>
          <h4 className="font-polysans text-md font-bold text-white">
            {turf.name}
          </h4>
          <p className="text-xs text-neutral-300 font-redhatmono">
            {turf.location} • {turf.distance}
          </p>
        </div>

        {/* Price and slot info */}
        <div className="flex items-center justify-between">
          <div className="font-polysans text-md font-bold text-white">
            &#2547;{turf.price}
            <span className="font-redhatmono text-sm font-normal text-yellow">
              /hour
            </span>
          </div>

          {/* Slot Progress Bar */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-neutral-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${(() => {
                  const [filled, total] = turf.slot.split("/").map(Number);
                  const percentage = (filled / total) * 100;

                  if (percentage <= 50) return "bg-green-500";
                  if (percentage <= 75) return "bg-yellow-500";
                  return "bg-red-500";
                })()}`}
                style={{
                  width: `${(() => {
                    const [filled, total] = turf.slot.split("/").map(Number);
                    return (filled / total) * 100;
                  })()}%`,
                }}
              />
            </div>
            <span className="text-xs font-redhatmono text-neutral-400">
              {turf.slot}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
