import { useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  Bell,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import NavBar from "../components/NavBar";
import depto from "../assets/depto.jpeg";
import SearchIcon from "../assets/icons/search.svg";
import { mockTurfs, TurfData } from "../data/mockData";

// Extend your data to include slot string like "3/10"
interface SlotCardData extends TurfData {
  slot: string;
}

export default function Games() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const turfsWithSlots = mockTurfs as SlotCardData[];

  const filteredTurfs = useMemo(
    () =>
      turfsWithSlots.filter(
        (t) =>
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.location.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [turfsWithSlots, searchTerm]
  );

  return (
    <div className="min-h-screen bg-green-800 text-neutral-100">
      {/* backdrop grid */}
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

      {/* Tighter container */}
      <div className="relative z-10 mx-auto max-w-screen-2xl px-4 lg:px-6 py-6">
        {/* Title + Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-6 gap-3">
          <h1
            ref={titleRef}
            className={`font-polysans font-bold text-white tracking-tight transition-all duration-300 origin-left text-3xl
            }`}>
            FIND GAMES!
          </h1>

          <div
            className="justify-self-start md:justify-self-end"
            ref={searchRef}>
            <HeaderSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isSearchExpanded={isSearchExpanded}
              setIsSearchExpanded={setIsSearchExpanded}
            />
          </div>
        </div>

        {/* ===== 4-column layout on large screens: 1 info + 3 cards ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT COLUMN (fixed 1 col) */}
          <aside className="col-span-1 space-y-6 lg:sticky lg:top-6 self-start min-w-0">
            <ProfileCard />
            <InboxCard
              items={[
                {
                  id: 1,
                  icon: <Bell className="w-4 h-4" />,
                  label: "Turf Nova — price dropped 10%",
                  time: "2m",
                },
                {
                  id: 2,
                  icon: <MessageSquare className="w-4 h-4" />,
                  label: "Aritra invited you to 7–9pm slot",
                  time: "1h",
                },
                {
                  id: 3,
                  icon: <Bell className="w-4 h-4" />,
                  label: "Booking confirmed — Futsal Hub",
                  time: "Yesterday",
                },
              ]}
            />
            <StatsPanel
              stats={[
                {
                  id: "games",
                  label: "Games this month",
                  value: "4",
                  delta: "+1",
                  icon: <Users className="w-4 h-4" />,
                },
                {
                  id: "att",
                  label: "Attendance",
                  value: "92%",
                  delta: "+6%",
                  icon: <TrendingUp className="w-4 h-4" />,
                },
                {
                  id: "inv",
                  label: "New invites",
                  value: "12",
                  delta: "+3",
                  icon: <Bell className="w-4 h-4" />,
                },
              ]}
            />
          </aside>

          {/* RIGHT SIDE: 3 columns of cards */}
          <main className="lg:col-span-3 min-w-0">
            <GalleryGrid turfs={filteredTurfs} />
          </main>
        </div>
      </div>
    </div>
  );
}

/* =================== HEADER SEARCH =================== */
function HeaderSearch({
  searchTerm,
  setSearchTerm,
  isSearchExpanded,
  setIsSearchExpanded,
}: {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  isSearchExpanded: boolean;
  setIsSearchExpanded: (b: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Desktop */}
      <div className="hidden md:block relative w-[28rem] max-w-full">
        <img
          src={SearchIcon}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-6"
        />
        <input
          type="text"
          placeholder="find games now"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-700/80 text-white font-redhatmono
                     outline-none focus:ring-2 focus:ring-gray-400 transition"
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div
          className={`relative transition-all duration-300 ${
            isSearchExpanded ? "w-64" : "w-12"
          }`}>
          <div className="relative h-12 bg-almostwhite rounded-2xl">
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
              onClick={() => !isSearchExpanded && setIsSearchExpanded(true)}>
              <img
                src={SearchIcon}
                className="w-6 h-6"
                alt="Search"
              />
            </div>

            {isSearchExpanded && (
              <input
                type="text"
                placeholder="find games now"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => {
                  if (!searchTerm) setIsSearchExpanded(false);
                }}
                autoFocus
                className="w-full h-full pl-12 pr-10 bg-transparent rounded-2xl
                           focus:outline-none focus:ring-2 focus:ring-gray-500
                           font-redhatmono text-black text-sm"
              />
            )}

            {isSearchExpanded && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setIsSearchExpanded(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =================== LEFT COLUMN CARDS =================== */
function ProfileCard() {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/90 relative p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 10% 0%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      <div className="flex gap-4 relative">
        <img
          src={depto}
          alt="Profile"
          className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold truncate">Rawnak Hossain</h2>
            <BadgeCheck className="fill-white text-black w-4 h-4 shrink-0" />
          </div>
          <p className="text-neutral-400 font-redhatmono text-sm truncate">
            CDM
          </p>
          <p className="text-neutral-400 font-redhatmono text-sm truncate">
            Toxic Pants
          </p>
          <div className="font-redhatmono text-sm text-yellow pt-0.5">
            <span className="text-white">4</span> games played
          </div>
        </div>
      </div>
    </div>
  );
}

function InboxCard({
  items,
}: {
  items: { id: number; icon: React.ReactNode; label: string; time: string }[];
}) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-polysans text-lg font-semibold">Notifications</h3>
        <span className="text-xs text-neutral-400 font-redhatmono">
          View all
        </span>
      </div>

      <div className="space-y-2">
        {items.map((x) => (
          <div
            key={x.id}
            className="flex items-center gap-3 rounded-2xl bg-neutral-800/60 px-3 py-2 hover:bg-neutral-800 transition">
            <div className="rounded-xl bg-neutral-900 border border-neutral-700 p-2 shrink-0">
              {x.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{x.label}</p>
              <p className="text-xs text-neutral-400 font-redhatmono">
                {x.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsPanel({
  stats,
}: {
  stats: {
    id: string;
    label: string;
    value: string;
    delta: string;
    icon: React.ReactNode;
  }[];
}) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <h3 className="font-polysans text-lg font-semibold mb-3">Your stats</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl bg-neutral-800/60 border border-neutral-700 p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-neutral-300 min-w-0">
              <span className="rounded-lg bg-neutral-900 border border-neutral-700 p-1.5 shrink-0">
                {s.icon}
              </span>
              <span className="text-xs font-redhatmono truncate">
                {s.label}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-semibold">{s.value}</span>
              <span className="text-xs text-green-400 font-redhatmono">
                {s.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =================== RIGHT SIDE: GALLERY =================== */
function GalleryGrid({ turfs }: { turfs: SlotCardData[] }) {
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex flex-wrap gap-2 font-redhatmono ml-auto">
          <button className="rounded-xl border border-neutral-800 px-3 py-1.5 text-sm text-almostblack hover:bg-neutral-800 bg-almostwhite active:bg-green/55 transition">
            slots
          </button>
          <button className="rounded-xl border border-neutral-800 px-3 py-1.5 text-sm text-almostblack hover:bg-neutral-800 bg-almostwhite active:bg-green/55 transition">
            price
          </button>
          <button className="rounded-xl border border-neutral-800 px-3 py-1.5 text-sm text-almostblack hover:bg-neutral-800 bg-almostwhite active:bg-green/55 transition">
            distance
          </button>
        </div>
      </div>

      {/* 3 columns on lg+ always for field cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {turfs.map((t) => (
          <UpgradedCard
            key={t.id}
            turf={t}
          />
        ))}
      </div>
    </>
  );
}

/* =================== CARD =================== */
function UpgradedCard({ turf }: { turf: SlotCardData }) {
  const [filled, total] = turf.slot.split("/").map(Number);
  const pct = Math.min(100, Math.max(0, (filled / total) * 100));
  const barColor =
    pct <= 50 ? "bg-green-500" : pct <= 75 ? "bg-yellow-500" : "bg-red-500";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5 h-full">
      {/* subtle gradients like inspo */}
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 100% 0%, rgba(168,85,247,0.06) 0%, rgba(0,0,0,0) 60%), radial-gradient(120% 80% at 0% 100%, rgba(59,130,246,0.06) 0%, rgba(0,0,0,0) 60%)",
        }}
      />

      <div className="relative">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={turf.image}
            alt={turf.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-900/90 to-transparent" />
          {/* constrained badges */}
          <div className="absolute top-3 left-3 max-w-[55%] px-2.5 py-1 rounded-xl text-xs font-redhatmono bg-neutral-900/80 border border-neutral-700 text-neutral-200 truncate">
            {turf.location}
          </div>
          <div className="absolute top-3 right-3 max-w-[35%] px-2.5 py-1 rounded-xl text-xs font-redhatmono bg-neutral-900/80 border border-neutral-700 text-neutral-200 truncate">
            {turf.distance}
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-3">
          <h4 className="font-polysans text-lg font-bold text-white truncate">
            {turf.name}
          </h4>

          <div className="flex items-center justify-between gap-3">
            <div className="font-polysans text-xl font-bold text-white shrink-0">
              &#2547;{turf.price}
              <span className="font-redhatmono text-sm font-normal text-yellow">
                /hour
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-24 h-2 bg-neutral-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${barColor}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-redhatmono text-neutral-400">
                {turf.slot}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-xl text-xs font-redhatmono bg-neutral-800/70 border border-neutral-700">
              5v5
            </span>
            <span className="px-2.5 py-1 rounded-xl text-xs font-redhatmono bg-neutral-800/70 border border-neutral-700">
              Indoor
            </span>
            <span className="px-2.5 py-1 rounded-xl text-xs font-redhatmono bg-neutral-800/70 border border-neutral-700">
              Lights
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
