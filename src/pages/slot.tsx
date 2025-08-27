import { useState, Fragment } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  CreditCard,
  User,
  Phone,
} from "lucide-react";
import NavBar from "../components/NavBar";
import { mockTurfs, TurfData } from "../data/mockData";

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
}

interface TurfCard extends TurfData {}

type SlotAvailability = "available" | "booked" | "unavailable";

export default function TurfBooking() {
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [selectedTurf, setSelectedTurf] = useState<string>(mockTurfs[0].name);

  // Generate dates for current week
  const getWeekDates = (weekOffset: number = 0): WeekDate[] => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + weekOffset * 7);

    const dates = [];
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

  // Generate time slots (6 AM to 11 PM, 90-minute slots)
  const generateTimeSlots = (): TimeSlot[] => {
    const slots = [];
    for (let hour = 6; hour <= 21; hour += 1.5) {
      const startHour = Math.floor(hour);
      const startMinute = (hour % 1) * 60;
      const endHour = Math.floor(hour + 1.5);
      const endMinute = ((hour + 1.5) % 1) * 60;

      const formatTime = (h: number, m: number): string => {
        const period = h >= 12 ? "PM" : "AM";
        const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
        return `${displayHour}:${m.toString().padStart(2, "0")} ${period}`;
      };

      slots.push({
        id: `${startHour}-${startMinute}`,
        start: formatTime(startHour, startMinute),
        end: formatTime(endHour, endMinute),
        time24: `${startHour.toString().padStart(2, "0")}:${startMinute
          .toString()
          .padStart(2, "0")}`,
      });
    }
    return slots;
  };

  const weekDates = getWeekDates(currentWeekOffset);
  const timeSlots = generateTimeSlots();

  // Mock availability data
  const getSlotAvailability = (
    date: string,
    slotId: string
  ): SlotAvailability => {
    const random = Math.random();
    if (random > 0.7) return "booked";
    if (random > 0.85) return "unavailable";
    return "available";
  };

  const isSlotSelected = (date: string, slotId: string): boolean => {
    return selectedSlots.some(
      (slot) => slot.date === date && slot.slotId === slotId
    );
  };

  const toggleSlot = (date: string, slotId: string, slot: TimeSlot): void => {
    const slotKey: SelectedSlot = { date, slotId, slot };
    const isSelected = isSlotSelected(date, slotId);

    if (isSelected) {
      setSelectedSlots(
        selectedSlots.filter((s) => !(s.date === date && s.slotId === slotId))
      );
    } else {
      if (getSlotAvailability(date, slotId) === "available") {
        setSelectedSlots([...selectedSlots, slotKey]);
      }
    }
  };

  const getSlotButtonClass = (date: string, slotId: string): string => {
    const availability = getSlotAvailability(date, slotId);
    const isSelected = isSlotSelected(date, slotId);

    if (isSelected) return "bg-green text-white border-green";
    if (availability === "booked")
      return "bg-red-900 text-red-400 border-red-700 cursor-not-allowed";
    if (availability === "unavailable")
      return "bg-neutral-700 text-neutral-500 border-neutral-600 cursor-not-allowed";
    return "bg-neutral-800 text-neutral-300 border-neutral-600 hover:border-yellow hover:bg-darkgreen hover:text-white cursor-pointer";
  };

  const totalAmount: number = selectedSlots.length * 50; // ৳50 per slot

  // Get current selected turf data
  const currentTurf =
    mockTurfs.find((turf) => turf.name === selectedTurf) || mockTurfs[0];

  const getWeekRange = (): string => {
    const dates = getWeekDates(currentWeekOffset);
    return `${dates[0].date} ${dates[0].month} - ${dates[6].date} ${dates[6].month}`;
  };

  return (
    <div className="min-h-screen bg-green-800 text-neutral-100">
      {/* Background Grid */}
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

      {/* Header */}
      <div className="relative z-10 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-green text-neutral-900 p-2 rounded-xl flex-shrink-0">
                <Users className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-polysans font-bold text-white">
                  TURF BOOKING
                </h1>
                <p className="text-neutral-400 font-redhatmono text-xs sm:text-sm">
                  Select your preferred slots
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-neutral-400 font-redhatmono">
                Guest User
              </p>
              <p className="font-polysans font-semibold text-white text-sm sm:text-base">
                #23037
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Booking Panel */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Location Selection */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-polysans font-semibold text-white mb-3 sm:mb-4 flex items-center">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-yellow mr-2" />
                Location
              </h2>
              <div className="flex items-center space-x-2 text-neutral-300 font-redhatmono text-sm sm:text-base">
                <MapPin className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                <span className="truncate">{currentTurf.location}</span>
              </div>
            </div>

            {/* Turf Selection */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-polysans font-semibold text-white mb-3 sm:mb-4">
                Select Turf
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {mockTurfs.slice(0, 6).map((turf: TurfData) => (
                  <button
                    key={turf.id}
                    onClick={() => setSelectedTurf(turf.name)}
                    className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-redhatmono font-medium transition-all text-sm sm:text-base ${
                      selectedTurf === turf.name
                        ? "bg-green text-white shadow-lg"
                        : "bg-neutral-800 text-neutral-300 hover:bg-darkgreen hover:text-white"
                    }`}>
                    {turf.name.length > 12
                      ? `${turf.name.substring(0, 12)}...`
                      : turf.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Week Navigation */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-polysans font-semibold text-white flex items-center">
                  <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-yellow mr-2" />
                  Select Week
                </h2>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
                    className="p-2 text-yellow hover:bg-neutral-800 rounded-xl transition-colors">
                    <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                  <span className="text-sm sm:text-lg font-polysans font-medium text-white min-w-[160px] sm:min-w-[200px] text-center">
                    {getWeekRange()}
                  </span>
                  <button
                    onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                    className="p-2 text-yellow hover:bg-neutral-800 rounded-xl transition-colors">
                    <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 gap-1 sm:gap-4 mb-4">
                {weekDates.map((day: WeekDate, index: number) => (
                  <div
                    key={index}
                    className="text-center">
                    <div className="text-xs sm:text-sm font-redhatmono font-medium text-neutral-400 mb-1">
                      {day.day}
                    </div>
                    <div className="text-sm sm:text-lg font-polysans font-bold text-white">
                      {day.date}
                    </div>
                    <div className="text-xs font-redhatmono text-neutral-500">
                      {day.month}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slots Grid */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-polysans font-semibold text-white flex items-center">
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-yellow mr-2" />
                  <span className="hidden sm:inline">
                    Available Slots (90 minutes each)
                  </span>
                  <span className="sm:hidden">Time Slots</span>
                </h2>
                <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm font-redhatmono">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-3 sm:w-4 h-3 sm:h-4 bg-neutral-800 border-2 border-neutral-600 rounded"></div>
                    <span className="text-neutral-400">Available</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-3 sm:w-4 h-3 sm:h-4 bg-green rounded"></div>
                    <span className="text-neutral-400">Selected</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="w-3 sm:w-4 h-3 sm:h-4 bg-red-900 border border-red-700 rounded"></div>
                    <span className="text-neutral-400">Booked</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="grid grid-cols-8 gap-1 sm:gap-2 min-w-[600px] sm:min-w-[800px] px-4 sm:px-0">
                  {/* Time Labels */}
                  <div className="col-span-1"></div>
                  {weekDates.map((day: WeekDate, index: number) => (
                    <div
                      key={index}
                      className="text-center text-xs sm:text-sm font-redhatmono font-medium text-neutral-400 p-1 sm:p-2">
                      <span className="sm:hidden">{day.day}</span>
                      <span className="hidden sm:inline">
                        {day.day} {day.date}
                      </span>
                    </div>
                  ))}

                  {/* Time Slots */}
                  {timeSlots.map((slot: TimeSlot) => (
                    <Fragment key={slot.id}>
                      <div className="flex items-center text-xs sm:text-sm font-redhatmono font-medium text-neutral-300 p-1 sm:p-2">
                        <span className="sm:hidden">
                          {slot.start.replace(" ", "")}
                        </span>
                        <span className="hidden sm:inline">{slot.start}</span>
                      </div>
                      {weekDates.map((day: WeekDate, dayIndex: number) => (
                        <button
                          key={`${day.fullDate}-${slot.id}`}
                          onClick={() =>
                            toggleSlot(day.fullDate, slot.id, slot)
                          }
                          className={`p-1 sm:p-3 text-xs sm:text-sm font-redhatmono font-medium border-2 rounded-lg sm:rounded-xl transition-all ${getSlotButtonClass(
                            day.fullDate,
                            slot.id
                          )}`}
                          disabled={
                            getSlotAvailability(day.fullDate, slot.id) !==
                              "available" &&
                            !isSlotSelected(day.fullDate, slot.id)
                          }>
                          <span className="sm:hidden">•</span>
                          <span className="hidden sm:inline">{slot.start}</span>
                        </button>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="space-y-4 sm:space-y-6 order-first lg:order-last">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-lg sm:text-xl font-polysans font-semibold text-white mb-3 sm:mb-4">
                Booking Summary
              </h2>

              {selectedSlots.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  <div className="border border-green/30 rounded-xl p-3 sm:p-4 bg-green/10">
                    <div className="flex items-center space-x-3 mb-2 sm:mb-3">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-polysans font-semibold text-white text-sm sm:text-base truncate">
                          {currentTurf.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-redhatmono text-neutral-400">
                          90 minutes per slot
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 font-redhatmono text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Location:</span>
                      <span className="font-medium text-white truncate ml-2">
                        {currentTurf.location}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Selected Slots:</span>
                      <span className="font-medium text-white">
                        {selectedSlots.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Price per Slot:</span>
                      <span className="font-medium text-white">&#2547;50</span>
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
                    <div className="space-y-2 max-h-32 sm:max-h-40 overflow-y-auto">
                      {selectedSlots.map(
                        (slot: SelectedSlot, index: number) => (
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
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-neutral-700">
                    <div className="space-y-2 sm:space-y-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-3 sm:w-4 h-3 sm:h-4" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-green focus:border-transparent font-redhatmono text-white placeholder-neutral-500 text-sm sm:text-base"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-3 sm:w-4 h-3 sm:h-4" />
                        <input
                          type="tel"
                          placeholder="Mobile Number"
                          className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:ring-2 focus:ring-green focus:border-transparent font-redhatmono text-white placeholder-neutral-500 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => (window.location.href = "/payment")}
                    className="w-full bg-green text-white py-2 sm:py-3 rounded-xl font-polysans font-semibold hover:bg-darkgreen transition-colors flex items-center justify-center space-x-2 shadow-lg text-sm sm:text-base">
                    <CreditCard className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span>Book Now - &#2547;{totalAmount}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8 text-neutral-400">
                  <Clock className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-3 text-neutral-600" />
                  <p className="font-redhatmono text-sm sm:text-base">
                    Select time slots to continue
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
