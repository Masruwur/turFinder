import { useState, useRef, useEffect, MouseEvent } from "react";
import { gsap } from "gsap";
import SearchIcon from "../assets/icons/search.svg";
import YellowStarIcon from "../assets/icons/yellowstar.svg";
import MapPinIcon from "../assets/icons/map.svg";
import GridIcon from "../assets/icons/grid.svg";
import ListIcon from "../assets/icons/list.svg";
import FilterIcon from "../assets/icons/filter.svg";
import ArrowDownIcon from "../assets/icons/arrow-down.svg";
import ClubVolta from "../assets/turfs/clubvolta.png";
import GSP from "../assets/turfs/gsp.png";
import Jaff from "../assets/turfs/jaff.png";
import KickOff from "../assets/turfs/kickoff.png";
import Metroplex from "../assets/turfs/metroplex.png";
import NorthArena from "../assets/turfs/northarena.png";
import NavBar from "../components/NavBar";

// ===== TYPE DEFINITIONS =====
interface TurfCard {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  distance: string;
}

// ===== MAIN COMPONENT - FUNCTION COMPONENT =====
export default function TurFindPage() {
  // ===== STATE MANAGEMENT =====
  const [searchTerm, setSearchTerm] = useState(""); // User's search input
  const [sortBy, setSortBy] = useState("recommended"); // Current sort option
  const [showSortDropdown, setShowSortDropdown] = useState(false); // Sort dropdown visibility
  const [showFilterDropdown, setShowFilterDropdown] = useState(false); // Filter dropdown visibility

  // ===== GSAP ANIMATION REFS =====
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // ===== MOCK DATA =====
  const mockTurfs: TurfCard[] = [
    {
      id: 1,
      name: "North Arena",
      location: "Sector-7, Uttara",
      rating: 4.8,
      price: 1500,
      image: NorthArena,
      distance: "0.5 km away",
    },
    {
      id: 2,
      name: "Club Volta",
      location: "Matikata Rd, Cantonment",
      rating: 4.6,
      price: 1200,
      image: ClubVolta,
      distance: "1.2 km away",
    },
    {
      id: 3,
      name: "Galacticos Sports Pavilion (GSP)",
      location: "Sector-15, Uttara",
      rating: 4.9,
      price: 1800,
      image: GSP,
      distance: "0.8 km away",
    },
    {
      id: 4,
      name: "Metroplex",
      location: "Khilkhet",
      rating: 4.5,
      price: 1000,
      image: Metroplex,
      distance: "2.1 km away",
    },
    {
      id: 5,
      name: "KickOff",
      location: "300 Feet Road, Purbachal",
      rating: 4.7,
      price: 1600,
      image: KickOff,
      distance: "1.5 km away",
    },
    {
      id: 6,
      name: "JAFF",
      location: "Bashundhara Gate",
      rating: 4.4,
      price: 2000,
      image: Jaff,
      distance: "3.2 km away",
    },
    {
      id: 7,
      name: "North Arena",
      location: "Sector-7, Uttara",
      rating: 4.8,
      price: 1500,
      image: NorthArena,
      distance: "0.5 km away",
    },
    {
      id: 8,
      name: "Club Volta",
      location: "Matikata Rd, Cantonment",
      rating: 4.6,
      price: 1200,
      image: ClubVolta,
      distance: "1.2 km away",
    },
    {
      id: 9,
      name: "Galacticos Sports Pavilion (GSP)",
      location: "Sector-15, Uttara",
      rating: 4.9,
      price: 1800,
      image: GSP,
      distance: "0.8 km away",
    },
  ];

  // ===== SORT OPTIONS =====
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "distance", label: "Nearest First" },
  ];

  // ===== GSAP ANIMATIONS =====
  // Main animation effect that runs on component mount and dropdown state changes
  useEffect(() => {
    // Dropdown animations - only animate when dropdowns become visible
    if (showSortDropdown && sortDropdownRef.current) {
      gsap.from(sortDropdownRef.current, {
        opacity: 1,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (showFilterDropdown && filterDropdownRef.current) {
      gsap.from(filterDropdownRef.current, {
        opacity: 1,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [showSortDropdown, showFilterDropdown]); // Re-run when dropdown states change

  // ===== EVENT HANDLERS =====

  // Handle card hover animation - lift effect
  const handleCardHover = (e: MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: -8, // Lift up by 8px
      scale: 1.02, // Slightly scale up
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Handle card hover leave animation - return to normal
  const handleCardLeave = (e: MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: 0, // Return to original position
      scale: 1, // Return to original scale
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // ===== DATA FILTERING =====
  // Filter turfs based on search term - searches both name and location
  const filteredTurfs = mockTurfs.filter(
    (turf) =>
      turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turf.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== COMPONENT RENDER =====
  return (
    <div className="w-full min-h-screen bg-green-800 px-10 md:px-25 lg:px-40 py-25 relative overflow-hidden">
      {/* ===== BACKGROUND GRID ===== */}
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
      <div>
        {/* ===== PAGE HEADER ===== */}
        <h1
          ref={titleRef}
          className="font-polysans text-5xl font-bold text-almostwhite mb-8 tracking-tight relative">
          BOOK A TURF!
        </h1>

        {/* ===== SEARCH SECTION ===== */}
        <div
          ref={searchRef}
          className="mb-8">
          <div className="relative max-w-lg">
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
              className="w-full pl-13 pr-4 py-4 text-lg rounded-2xl transition-colors duration-300 tracking-tight
                         bg-almostwhite focus:outline-none focus:ring-2
                         font-redhatmono text-almostblack"
            />
          </div>
        </div>

        {/* ===== CONTROLS SECTION ===== */}
        <div
          ref={controlsRef}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            {/* ===== SORT DROPDOWN ===== */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-colors duration-300 cursor-pointer
                           bg-almostwhite hover:bg-yellow
                           font-redhatmono text-almostblack">
                Sort By:{" "}
                {sortOptions.find((opt) => opt.value === sortBy)?.label}
                <img
                  src={ArrowDownIcon}
                  className={`w-5 transition-transform duration-300 ${
                    showSortDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Sort dropdown menu - only visible when showSortDropdown is true */}
              {showSortDropdown && (
                <div
                  ref={sortDropdownRef}
                  className="absolute top-full left-0 mt-2 w-65 rounded-xl shadow-lg z-50
                             bg-almostwhite">
                  {sortOptions.map((option, index) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 transition-colors duration-200 
                                  font-redhatmono text-almostblack cursor-pointer
                                  ${
                                    sortBy === option.value
                                      ? "bg-yellow"
                                      : "bg-almostwhite hover:bg-beige"
                                  }
                                  ${index === 0 ? "rounded-t-xl" : ""}
                                  ${
                                    index === sortOptions.length - 1
                                      ? "rounded-b-xl"
                                      : ""
                                  }
                                `}>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ===== FILTER DROPDOWN ===== */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-xl font-medium transition-colors duration-300 cursor-pointer
                           bg-lightgreen hover:bg-darkgreen hover:text-almostwhite
                           font-redhatmono text-almostblack">
                <img
                  src={FilterIcon}
                  className="w-5 sm:w-6"
                />
                Filters
              </button>

              {/* Filter dropdown menu - contains price and rating filters */}
              {showFilterDropdown && (
                <div
                  ref={filterDropdownRef}
                  className="absolute top-full left-0 mt-2 w-65 rounded-xl shadow-lg z-50 p-4
                             bg-almostwhite border-2 border-solid border-almostblack">
                  <div className="space-y-4">
                    {/* Price range filter */}
                    <div>
                      <label className="block font-redhatmono text-sm font-medium text-almostblack mb-2">
                        Price Range
                      </label>
                      <div className="flex justify-evenly gap-4">
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full px-3 py-2 rounded-lg font-redhatmono text-sm text-almostblack
                                     border-1 border-solid border-almostblack"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full px-3 py-2 rounded-lg font-redhatmono text-sm text-almostblack
                                     border-1 border-solid border-almostblack"
                        />
                      </div>
                    </div>
                    {/* Rating filter */}
                    <div>
                      <label className="block font-redhatmono text-sm font-medium text-almostblack mb-2">
                        Rating
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-lg font-redhatmono text-sm text-almostblack
                                   border-1 border-solid border-almostblack cursor-pointer">
                        <option>Any Rating</option>
                        <option>4+ Stars</option>
                        <option>3+ Stars</option>
                        <option>2+ Stars</option>
                        <option>1+ Stars</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== RESULTS COUNT ===== */}
          <div className="font-redhatmono text-almostwhite relative">
            {filteredTurfs.length} turfs found
          </div>
        </div>

        {/* ===== TURF CARDS GRID ===== */}
        <div
          ref={cardsRef}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 relative z-10">
          {filteredTurfs.map((turf) => (
            <article
              key={turf.id}
              className="turf-card overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 cursor-pointer"
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}>
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
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="font-polysans text-md font-bold text-white">
                      {turf.name}
                    </h4>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <img
                        src={YellowStarIcon}
                        className="w-4 h-4"
                      />
                      <span className="font-redhatmono text-xs font-medium text-white">
                        {turf.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 font-redhatmono">
                    {turf.location} • {turf.distance}
                  </p>
                </div>

                {/* Price and booking button */}
                <div className="flex items-center justify-between">
                  <div className="font-polysans text-md font-bold text-white">
                    &#2547;{turf.price}
                    <span className="font-redhatmono text-sm font-normal text-yellow">
                      /hour
                    </span>
                  </div>

                  {/* Book now button */}
                  <button
                    onClick={() => (window.location.href = "/slot")}
                    className="px-4 py-2 font-medium rounded-lg transition-colors duration-300
                               bg-green font-redhatmono text-almostwhite cursor-pointer
                               hover:bg-darkgreen active:bg-darkgreen/80 text-sm">
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ===== NO RESULTS STATE ===== */}
        {/* Shown when no turfs match the search criteria */}
        {filteredTurfs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏟️</div>
            <h3 className="font-polysans text-2xl font-bold text-almostblack mb-2">
              No turfs found
            </h3>
            <p className="font-redhatmono text-almostblack/70">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* ===== CLICK OUTSIDE OVERLAY ===== */}
      {/* Invisible overlay that closes dropdowns when clicked */}
      {(showSortDropdown || showFilterDropdown) && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => {
            setShowSortDropdown(false);
            setShowFilterDropdown(false);
          }}
        />
      )}
    </div>
  );
}
