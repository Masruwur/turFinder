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
  const [isGridView, setIsGridView] = useState(true); // Toggle between grid and list view
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

  // Handle view toggle between grid and list layout
  const handleViewToggle = () => {
    setIsGridView(!isGridView);
    // Animate cards when view changes
    gsap.from(".turf-card", {
      scale: 0.9, // Start slightly smaller
      opacity: 1,
      duration: 0.3,
      stagger: 0.05, // Quick stagger effect
      ease: "power2.out",
    });
  };

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
          className="font-polysans text-7xl font-bold text-almostwhite mb-8 tracking-tight relative">
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
            {/* ===== VIEW TOGGLE BUTTONS ===== */}
            <div className="flex rounded-xl p-1 bg-yellow">
              {/* Grid view button */}
              <button
                onClick={handleViewToggle}
                className={`p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer
                          ${isGridView ? "bg-almostwhite" : "bg-transparent"}`}>
                <img
                  src={GridIcon}
                  className="w-4 sm:w-5"
                />
              </button>
              {/* List view button */}
              <button
                onClick={handleViewToggle}
                className={`p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer
                          ${
                            !isGridView ? "bg-almostwhite" : "bg-transparent"
                          }`}>
                <img
                  src={ListIcon}
                  className="w-4 sm:w-5"
                />
              </button>
            </div>

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
          className={`grid border-2 border-almostblack relative
              ${
                isGridView
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // Grid layout
                  : "grid-cols-1" // List layout
              }`}>
          {filteredTurfs.map((turf) => (
            <div
              key={turf.id}
              className={`turf-card cursor-pointer transition-shadow duration-300 hover:shadow-lg
                 bg-almostwhite border-1 border-almostblack
                 ${
                   isGridView
                     ? "p-4 sm:p-6 lg:p-8"
                     : "flex p-3 sm:p-6 lg:p-8 overflow-hidden"
                 }`}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}>
              {/* ===== TURF IMAGE ===== */}
              <div
                className={`flex items-center justify-center border-2 border-solid border-darkgreen
                   ${
                     isGridView
                       ? "w-full h-40 sm:h-48 mb-4 bg-almostwhite"
                       : "w-2/5 sm:w-1/3 h-32 sm:h-48 lg:min-h-[200px] mr-3 sm:mr-6 bg-almostwhite flex-shrink-0"
                   }`}>
                <img
                  src={turf.image}
                  alt={turf.name}
                  className="w-full h-full object-cover object-bottom"
                />
              </div>

              {/* ===== TURF INFORMATION ===== */}
              <div
                className={`${
                  isGridView
                    ? "space-y-3"
                    : "flex-1 flex flex-col justify-between min-w-0"
                }`}>
                <div
                  className={`${isGridView ? "" : "space-y-1 sm:space-y-3"}`}>
                  {/* Turf name and rating */}
                  <div className="flex justify-between items-start gap-1 sm:gap-2">
                    <h3
                      className={`font-polysans font-bold text-almostblack leading-tight truncate
                               ${
                                 isGridView
                                   ? "text-lg sm:text-xl"
                                   : "text-sm sm:text-xl lg:text-2xl"
                               }`}>
                      {turf.name}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <img
                        src={YellowStarIcon}
                        className="w-3 sm:w-4 lg:w-5"
                      />
                      <span className="font-redhatmono text-xs font-medium text-almostblack">
                        {turf.rating}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <img
                      src={MapPinIcon}
                      className="w-3 sm:w-4 lg:w-5 -ml-1 flex-shrink-0"
                    />
                    <span
                      className={`font-redhatmono text-almostblack/80 truncate
                               ${
                                 isGridView
                                   ? "text-xs sm:text-sm"
                                   : "text-xs sm:text-sm lg:text-base"
                               }`}>
                      {turf.location}
                    </span>
                  </div>

                  {/* Distance */}
                  <div
                    className={`font-redhatmono text-almostblack/60
                              ${
                                isGridView
                                  ? "text-xs sm:text-sm"
                                  : "block text-xs sm:text-sm lg:text-base"
                              }`}>
                    {turf.distance}
                  </div>
                </div>

                {/* Price and booking button */}
                <div
                  className={`flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0
                            ${isGridView ? "pt-2" : "pt-2 sm:pt-3 lg:pt-4"}`}>
                  <div
                    className={`font-polysans font-bold text-almostblack
                              ${
                                isGridView
                                  ? "text-xl sm:text-2xl"
                                  : "text-lg sm:text-2xl lg:text-3xl"
                              }`}>
                    &#2547;{turf.price}
                    <span
                      className={`font-redhatmono font-normal text-almostblack/80
                               ${
                                 isGridView
                                   ? "text-xs sm:text-sm"
                                   : "text-xs sm:text-sm lg:text-base"
                               }`}>
                      /hour
                    </span>
                  </div>


                  {/* Book now button */}
                  <button
                    onClick={() => (window.location.href = "/payment")}
                    className={`font-medium rounded-lg sm:rounded-xl transition-colors duration-300
                               bg-green font-redhatmono text-almostwhite cursor-pointer
                               hover:bg-darkgreen active:bg-darkgreen/80 flex-shrink-0
                               ${
                                 isGridView
                                   ? "px-4 py-2 sm:px-6 text-sm sm:text-base"
                                   : "px-3 py-1 sm:px-6 sm:py-2 lg:px-8 lg:py-3 text-xs sm:text-base lg:text-lg"
                               }`}>

                    Book Now
                  </button>
                </div>
              </div>
            </div>
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
