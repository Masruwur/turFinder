import { useState, useEffect ,useRef } from "react";
import {
  MapPin,
  Users,
  CreditCard,
  User as UserIcon,
  Phone,
  MousePointer2,
  X,
  LogIn,
  CheckCircle2,
  ShieldCheck,
  Clock,
  BellRing,
  Gift,
} from "lucide-react";
import NavBar,{NavBarRef} from "../components/NavBar";
import TurfCarousel from "../components/TurfCarousel";
import { TurfEntity } from "../data/mockData";
import { redirect, useLocation } from "react-router";
import { useUser } from "../util/user";
import api from "../util/api";
import MapComponent from "../util/map";

interface Review{
  id:number;
  rating:number;
  text:string;
  user_id:number;
  user_name:string;
  created_at:string;
}

interface Booking{
  startTime: string;
  endTime: string;
  date: string;
  status: string;
}

interface WeekDate {
  date: number;
  day: string;
  month: string;
  fullDate: string;
}
interface TimeSlot {
  id: string;
  start: string;
  end: string;
  time24: string;
}
interface SelectedSlot {
  date: string;
  slotId: string;
  slot: TimeSlot;
  price: number;
}
type SlotAvailability = "available" | "booked" | "unavailable";

const weekDayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};


function LoginNudge({ triggerNavBarAction }: { triggerNavBarAction: () => void }) {
  const [open, setOpen] = useState(false);

  // Ref to NavBar to toggle profile
  const navRef = useRef<NavBarRef>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-login-nudge", onOpen as EventListener);
    return () =>
      window.removeEventListener("open-login-nudge", onOpen as EventListener);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-neutral-950 border border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center hover:bg-neutral-900 transition-colors"
        aria-label="Why sign in">
        <BellRing className="w-5 h-5 text-white" />
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-neutral-950" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-6 right-6 w-[92vw] max-w-sm rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-neutral-800 flex items-start justify-between">
              <div>
                <div className="text-[11px] tracking-widest text-green-400/80">
                  NEW
                </div>
                <h3 className="text-lg font-polysans font-semibold text-white">
                  Why sign in matters
                </h3>
                <p className="text-neutral-400 text-sm mt-1">
                  Keep your selections, pay faster, and never miss a match.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-neutral-900 text-neutral-400"
                aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60">
                <img
                  src={
                    /* fallback tiny banner */ "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                  }
                  alt=""
                  className="h-32 w-full object-cover"
                />
              </div>

              <ul className="space-y-2 text-sm text-neutral-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green" />
                  <span>Save and resume bookings across devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-yellow" />
                  <span>Get reminders and reschedule updates instantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Secure payments with receipts in one place</span>
                </li>
              </ul>
            </div>

            <div className="px-4 py-3 border-t border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-7 w-7 rounded-full bg-neutral-900 border border-neutral-800 grid place-items-center">
                  <Gift className="w-4 h-4 text-neutral-200" />
                </div>
                Perks, faster checkout, saved teams
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 hover:bg-neutral-800">
                  Later
                </button>
                <button onClick={()=>{
                    setOpen(false);
                    triggerNavBarAction();
                }}
                  className="px-3 py-2 rounded-xl bg-green text-white hover:bg-darkgreen flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BentoCard({
  className = "",
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={[
        "bg-transparent border border-neutral-800 rounded-2xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]",
        "h-full flex flex-col overflow-hidden",
        className,
      ].join(" ")}>
      {children}
    </div>
  );
}

function ReviewsCard(id : {id:number}) {
  const [reviews,setReviews] = useState<Review[]>([]);
  //fetching real reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try{const response = await api.get(`/turfs/reviews/${id.id}`);
          setReviews(response.data); 
      }catch(error){
        console.error("Error fetching reviews:", error);
     }  
    }
    fetchReviews();
      
  }, []);
  
  return (
    <BentoCard className="p-5 sm:p-6">
      <h3 className="flex justify-center font-polysans text-xl font-semibold text-white">
        Reviews
      </h3>
      <div className="mt-4 space-y-3">
        {reviews && reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl bg-neutral-800/80 border border-neutral-700 p-3">
            <p className="font-polysans text-sm text-neutral-200">
              <span className="font-semibold text-white">{review.user_name}</span> —{" "}
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

interface BookingSummaryProps {
  selectedSlots: SelectedSlot[];
  currTurf: TurfEntity;
  totalAmount: number;
  isMobile?: boolean;
}
function BookingSummary({
  selectedSlots,
  currTurf,
  totalAmount,
  isMobile = false
}: BookingSummaryProps) {
  if (selectedSlots.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="border border-green/30 rounded-xl p-3 sm:p-4 bg-green/10">
        <div className="flex items-center space-x-3 mb-2 sm:mb-3">
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green rounded-xl flex items-center justify-center flex-shrink-0">
            <Users className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-polysans font-semibold text-white text-sm sm:text-base truncate">
              {currTurf.name}
            </h3>
            <p className="text-xs sm:text-sm font-redhatmono text-neutral-400">
              {currTurf.slotDuration} minutes per slot
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3 font-redhatmono text-sm sm:text-base">
        <div className="flex justify-between">
          <span className="text-neutral-400">Location:</span>
          <span className="font-medium text-white truncate ml-2">
            {currTurf.location.address}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-400">Selected Slots:</span>
          <span className="font-medium text-white">{selectedSlots.length}</span>
        </div>
      </div>

      <div className="border-t border-neutral-700 pt-2 sm:pt-3">
        <div className="flex justify-between text-base sm:text-lg font-polysans font-bold text-yellow">
          <span>Total Amount:</span>
          <span>&#2547;{totalAmount}</span>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-neutral-700">
        <h4 className="font-polysans font-semibold text-white text-sm sm:text-base">
          Selected Time Slots:
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {selectedSlots.map((slot, index) => (
            <div
              key={index}
              className="text-xs sm:text-sm bg-neutral-800 border border-neutral-700 p-2 rounded-xl">
              <div className="font-polysans font-medium text-white">
                {new Date(slot.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="font-redhatmono text-neutral-400">
                {slot.slot.start} - {slot.slot.end}
              </div>
              <div className="font-redhatmono text-neutral-400 text-yellow">
                Price: &#2547;{slot.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isMobile && (
        <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-neutral-700">
          <div className="space-y-2 sm:space-y-3">
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-green focus:border-transparent font-redhatmono text-white placeholder-neutral-500 text-sm sm:text-base"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-green focus:border-transparent font-redhatmono text-white placeholder-neutral-500 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => (window.location.href = "/payment")}
        className="w-full bg-green text-white py-3 rounded-xl font-polysans font-semibold hover:bg-darkgreen transition-colors flex items-center justify-center space-x-2 shadow-lg text-sm sm:text-base">
        <CreditCard className="w-5 h-5" />
        <span>Book Now - &#2547;{totalAmount}</span>
      </button>
    </div>
  );
}

export default function TurfBooking() {
  const { user } = useUser();
  const location = useLocation();
  const currTurf: TurfEntity = location.state;
  const [bookingSet, setBookingSet] = useState<Set<string>>(new Set()); 

  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [totalAmount,setTotalAmount] = useState<number>(0);

  // Ref to NavBar to toggle profile
  const navRef = useRef<NavBarRef>(null);
 
  //fetch actual bookings
  useEffect(()=>{
    const fetchBookings = async () => {
      try{const response = await api.get(`/booking/${currTurf.id}`);
 
          const booked = new Set<string>();
          response.data.forEach((booking:Booking) => {
            booked.add(JSON.stringify({date: booking.date, start: booking.startTime , end: booking.endTime}));
          });
          setBookingSet(booked);
      }catch(error){
        console.error("Error fetching bookings:", error);
     }
    }
    fetchBookings();
  },[]);

  

  //navigate to maps
  const handleNavigateClick = (lat:number,lng:number) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank"); // opens in a new tab
  };

  //24 hour converter
  const ampmTo24 = (timeStr:string)=> {
      let [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
  }

  const timeToMinutes = (timeStr:string) => {
    const [h, m, s] = timeStr.split(":").map(Number);
    return h*60+ m;
 }

  const inTimeRange = (slot:TimeSlot, startTime:string, endTime:string) => {
      return (timeToMinutes(ampmTo24(slot.start)) >= timeToMinutes(startTime) && timeToMinutes(ampmTo24(slot.end)) <= timeToMinutes(endTime));

  }

  //slot price calculation
   const slotPrice = (day:string,slot:TimeSlot)=>{
      for(const price of currTurf.prices){
        if(price.startDay <= weekDayMap[day] && weekDayMap[day] <= price.endDay){
          if(inTimeRange(slot,price.startHour,price.endHour)) return price.pricePerHour;
        }
      }

      return 0;
   }

  // Week dates
  const getWeekDates = (weekOffset: number = 0): WeekDate[] => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate());

    const dates: WeekDate[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push({
        date: date.getDate(),
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        fullDate: date.toISOString().split("T")[0],
      });
    }
    return dates;
  };

  // 90-minute slots, 6:00 → 22:30 end
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 7; hour <= 22; hour += 1.5) {
      const startHour = Math.floor(hour);
      const startMinute = (hour % 1) * 60;
      const endHour = Math.floor(hour + 1.5);
      const endMinute = ((hour + 1.5) % 1) * 60;

      const fmt = (h: number, m: number) => {
        const period = h >= 12 ? "PM" : "AM";
        const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
        // Add zero padding to hours
        const paddedHour = displayHour.toString().padStart(2, "0");
        return `${paddedHour}:${m.toString().padStart(2, "0")} ${period}`;
      };

      slots.push({
        id: `${startHour}-${startMinute}`,
        start: fmt(startHour, startMinute),
        end: fmt(endHour, endMinute),
        time24: `${startHour.toString().padStart(2, "0")}:${startMinute
          .toString()
          .padStart(2, "0")}`,
      });
    }
    return slots;
  };

  const weekDates = getWeekDates(currentWeekOffset);
  const timeSlots = generateTimeSlots();

  //availability
  const getSlotAvailability = (
    date: string, slot:TimeSlot
  ): SlotAvailability => {
        if (
        bookingSet.has(
          JSON.stringify({
            date,
            start: ampmTo24(slot.start),
            end: ampmTo24(slot.end),
          })
        )
       ) 
        return "booked"; 

    return "available";
  };

  

  const isSlotSelected = (date: string, slotId: string) =>
    selectedSlots.some((s) => s.date === date && s.slotId === slotId);

  const toggleSlot = (date: string, slotId: string, slot: TimeSlot,price:number) => {
    const already = isSlotSelected(date, slotId);
    if (already) {
      setSelectedSlots((prev) =>
        prev.filter((s) => !(s.date === date && s.slotId === slotId))
      );
    } else if (getSlotAvailability(date, slot) === "available") {
      setSelectedSlots((prev) => [...prev, { date, slotId, slot,price }]);
    }
  };

  const getSlotButtonClass = (date: string, slot: TimeSlot): string => {
    const availability = getSlotAvailability(date, slot);
    const active = isSlotSelected(date, slot.id);
    if (active) return "bg-green text-white border-green";
    if (availability === "booked")
      return "bg-red-900 text-red-300 border-red-800 cursor-not-allowed";
    if (availability === "unavailable")
      return "bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed";
    return "bg-neutral-900 text-neutral-300 border-neutral-600 hover:border-yellow hover:bg-darkgreen hover:text-white cursor-pointer";
  };

  const hasSummary = selectedSlots.length > 0;

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      <NavBar ref={navRef}/>

      {/* Render the floating red-dot button only when logged out */}
      {!user && <LoginNudge triggerNavBarAction={()=>{navRef.current?.toggleProfile()}} />}

      {/* Header (replace your snippet with this so it also opens the pop-up) */}
      <div className="relative md:h-17.5 rounded-b-2xl z-10 border-b border-neutral-800 bg-neutral-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <h1 className="text-2xl font-polysans font-bold text-white">
              TURF BOOKING
            </h1>
            <p className="text-xs sm:text-sm text-white font-redhatmono">
              {user ? (
                user.name
              ) : (
                <button
                  onClick={() =>
                    window.dispatchEvent(new Event("open-login-nudge"))
                  }
                  className="relative inline-flex items-center gap-2 bg-red-700/20 text-red-300 border border-red-700/40 px-3 py-2 rounded-xl hover:bg-red-700/30">
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-neutral-900" />
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Please login to continue
                </button>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10 max-w-7xl">
        {/* ===== Bento grid =====
           Mobile: 1 col, natural flow
           Desktop (xl): EXACT placement (12 cols, 6 rows of equal height).
           This avoids holes and keeps the center hero perfectly centered. */}
        <div
          className={[
            "grid gap-4 sm:gap-6",
            "grid-cols-1 xl:grid-cols-12",
            // 6 equal rows at xl; items use row-start/end to fit with no gaps.
            "xl:auto-rows-[180px]",
            "relative",
          ].join(" ")}>
          {/* ---- Navigate (top-left), spans rows 1..3 ---- */}
          <div className="xl:col-start-1 xl:col-end-5 xl:row-start-1 xl:row-end-4">
            <BentoCard className="p-5 sm:p-6">
              <div className="flex items-center mb-3">
                <MousePointer2 className="w-5 h-5 mr-2 text-white/90" />
                <h3 className="font-polysans text-xl font-semibold text-white cursor-pointer" onClick={() => handleNavigateClick(currTurf.location.latitude,currTurf.location.longitude)}>
                  Navigate
                </h3>
              </div>
              <div>
                <MapComponent lat={currTurf.location.latitude} lng={currTurf.location.longitude}/>
              </div>

              <div className="mt-1 flex items-center text-neutral-300 font-redhatmono">
                <MapPin className="w-4 h-4 mr-2 text-neutral-400" />
                <span className="truncate">{currTurf.location.address}</span>
              </div>
              <div className="mt-auto" />
            </BentoCard>
          </div>

          {/* ---- KPIs (top-right), spans rows 1..2 ---- */}
          <div className="xl:col-start-9 xl:col-end-13 xl:row-start-1 xl:row-end-2">
            <BentoCard className="p-5 sm:p-6">
              <h3 className="flex justify-center font-polysans text-xl font-semibold text-white">
                This week’s Capacity
              </h3>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="rounded-xl bg-neutral-800/80 border border-neutral-700 p-3 text-center">
                  <p className="font-polysans text-xl font-bold text-white">
                    {77-bookingSet.size}
                  </p>
                  <p className="text-xs font-redhatmono text-neutral-400">
                    Slots
                  </p>
                </div>
                <div className="rounded-xl bg-neutral-800/80 border border-neutral-700 p-3 text-center">
                  <p className="font-polysans text-xl font-bold text-white">
                    {selectedSlots.length}
                  </p>
                  <p className="text-xs font-redhatmono text-neutral-400">
                    Selected
                  </p>
                </div>
                <div className="rounded-xl bg-neutral-800/80 border border-neutral-700 p-3 text-center">
                  <p className="font-polysans text-xl font-bold text-white">
                    ৳{totalAmount}
                  </p>
                  <p className="text-xs font-redhatmono text-neutral-400">
                    Total
                  </p>
                </div>
              </div>
              <div className="mt-auto" />
            </BentoCard>
          </div>

          {/* ---- CENTRAL HERO: Turf card, rows 1..3 ---- */}
          <div className="xl:col-start-5 xl:col-end-9 xl:row-start-1 xl:row-end-4">
            <BentoCard className="p-5 sm:p-6">
              <h2 className="font-polysans text-2xl sm:text-3xl font-bold text-white mb-3">
                {currTurf.name}
              </h2>
              <div className="rounded-2xl overflow-hidden">
                <TurfCarousel
                  images={currTurf.images}
                  height="h-48 xl:h-56"
                  altBase={`${currTurf.name} photo`}
                  showDots
                  showArrows
                />
              </div>
              <p className="mt-4 font-redhatmono text-sm text-neutral-300">
                <span className="text-yellow font-semibold"></span>{" "}
                {currTurf.description} • {currTurf.slotDuration}-min slots
              </p>
            </BentoCard>
          </div>

          {/* ---- TIME SLOTS: bottom-left, rows 4..6 ---- */}
          <div className="xl:col-start-1 xl:col-end-9 xl:row-start-4 xl:row-end-7">
            <BentoCard className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-polysans font-semibold text-white pt-2 pl-6">
                  Available Slots
                </h2>
                <div className="flex items-center space-x-4 pt-2 pr-6 text-xs sm:text-sm font-redhatmono text-neutral-400">
                  <span className="flex items-center">
                    <span className="w-3 h-3 mr-2 rounded border border-neutral-500 inline-block" />
                    Available
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 mr-2 rounded bg-green inline-block" />
                    Selected
                  </span>
                  <span className="flex items-center">
                    <span className="w-3 h-3 mr-2 rounded bg-red-900 inline-block" />
                    Booked
                  </span>
                </div>
              </div>

              {/* Scrollable content so the tile never grows and the grid stays gapless */}
              <div className="grow overflow-x-auto -mx-2 sm:mx-0">
                <div className="flex flex-col gap-1 sm:gap-2 md:min-w-[700px] xl:min-w-0 px-2 sm:px-5">
                  {/* Days header */}
                  <div className="flex">
                    <div className="flex-shrink-0 w-20 sm:w-24" />
                    {weekDates.map((day, index) => (
                      <div
                        key={index}
                        className="flex-1 text-center text-xs sm:text-sm font-redhatmono font-medium text-neutral-400 p-1 sm:p-2">
                        <span className="sm:hidden">{day.day}</span>
                        <span className="hidden sm:inline">
                          {day.day} {day.date}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Rows */}
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex">
                      <div className="flex-shrink-0 w-20 sm:w-24 flex items-center text-xs sm:text-sm font-redhatmono font-medium text-neutral-300 p-1 sm:p-1">
                        <span className="sm:hidden">
                          {slot.start.replace(" ", "")}
                        </span>
                        <span className="hidden sm:inline">{slot.start}</span>
                      </div>
                      {weekDates.map((day) => (
                        <div
                          key={`${day.fullDate}-${slot.id}`}
                          className="flex-1 px-1">
                          <button
                            onClick={() =>{
                              if(!isSlotSelected(day.fullDate, slot.id)){
                                 let price = slotPrice(day.day,slot);
                                 toggleSlot(day.fullDate, slot.id, slot,price);
                                 setTotalAmount(totalAmount + price);
                              }
                              else toggleSlot(day.fullDate, slot.id, slot,-1);   
                            }
                            }
                            className={[
                              "w-full p-1 sm:p-3 text-xs sm:text-sm font-redhatmono font-medium",
                              "border-2 rounded-lg sm:rounded-xl transition-all",
                              getSlotButtonClass(day.fullDate, slot),
                            ].join(" ")}
                            disabled={
                              getSlotAvailability(day.fullDate, slot) !==
                                "available" &&
                              !isSlotSelected(day.fullDate, slot.id)
                            }>
                            <span className="sm:hidden">•</span>
                            <span className="hidden sm:inline"></span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>

          {/* ---- RIGHT COLUMN: Summary (rows 3..6) OR Reviews ---- */}
          {hasSummary ? (
            <>
              <div className="xl:col-start-9 xl:col-end-13 xl:row-start-2 xl:row-end-4">
                <ReviewsCard id={currTurf.id} />
              </div>
              {/* Desktop sticky summary */}
              <div className="hidden xl:block xl:col-start-9 xl:col-end-13 xl:row-start-4 xl:row-end-8">
                <BentoCard className="p-5 sm:p-6 sticky top-6">
                  <h2 className="text-xl font-polysans font-semibold text-white mb-3">
                    Booking Summary
                  </h2>
                  <BookingSummary
                    selectedSlots={selectedSlots}
                    currTurf={currTurf}
                    totalAmount={totalAmount}
                  />
                </BentoCard>
              </div>

              {/* Mobile summary (stacks naturally) */}
              <div className="xl:hidden">
                <BentoCard className="p-5 sm:p-6">
                  <h2 className="text-xl font-polysans font-semibold text-white mb-3">
                    Booking Summary
                  </h2>
                  <BookingSummary
                    selectedSlots={selectedSlots}
                    currTurf={currTurf}
                    totalAmount={totalAmount}
                    isMobile
                  />
                </BentoCard>
              </div>
            </>
          ) : (
            // If nothing selected, keep grid full with Reviews
            <div className="xl:col-start-9 xl:col-end-13 xl:row-start-2 xl:row-end-4">
              <ReviewsCard id={currTurf.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


