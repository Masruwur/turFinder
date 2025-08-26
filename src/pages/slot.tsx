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

type SlotAvailability = "available" | "booked" | "unavailable";

export default function TurfBooking() {
  const [currentWeekOffset, setCurrentWeekOffset] = useState<number>(0);
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [selectedTurf, setSelectedTurf] = useState<string>("Turf A");

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

    if (isSelected) return "bg-green-500 text-white border-green-600";
    if (availability === "booked")
      return "bg-red-100 text-red-400 border-red-200 cursor-not-allowed";
    if (availability === "unavailable")
      return "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed";
    return "bg-white text-gray-700 border-gray-300 hover:border-green-400 hover:bg-green-50 cursor-pointer";
  };

  const totalAmount: number = selectedSlots.length * 50; // $50 per slot

  const turfs: string[] = ["Turf A", "Turf B", "Turf C"];

  const getWeekRange = (): string => {
    const dates = getWeekDates(currentWeekOffset);
    return `${dates[0].date} ${dates[0].month} - ${dates[6].date} ${dates[6].month}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-white text-green-600 p-2 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">SoccerTurf Pro</h1>
              <p className="text-green-100">Premium Football Booking</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-100">Guest User</p>
            <p className="font-semibold">#23037</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Location Selection */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-green-600 mr-2" />
                Select Location
              </h2>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>SoccerTurf Pro, Sports Complex</span>
              </div>
            </div>

            {/* Turf Selection */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Select Turf
              </h2>
              <div className="flex space-x-4">
                {turfs.map((turf: string) => (
                  <button
                    key={turf}
                    onClick={() => setSelectedTurf(turf)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedTurf === turf
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-green-100"
                    }`}>
                    {turf}
                  </button>
                ))}
              </div>
            </div>

            {/* Week Navigation */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Calendar className="w-5 h-5 text-green-600 mr-2" />
                  Select Week
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-medium text-gray-700 min-w-[200px] text-center">
                    {getWeekRange()}
                  </span>
                  <button
                    onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 gap-4 mb-4">
                {weekDates.map((day: WeekDate, index: number) => (
                  <div
                    key={index}
                    className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      {day.day}
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {day.date}
                    </div>
                    <div className="text-xs text-gray-500">{day.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slots Grid */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Clock className="w-5 h-5 text-green-600 mr-2" />
                  Available Slots (90 minutes each)
                </h2>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                    <span className="text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-600">Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                    <span className="text-gray-600">Booked</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="grid grid-cols-8 gap-2 min-w-[800px]">
                  {/* Time Labels */}
                  <div className="col-span-1"></div>
                  {weekDates.map((day: WeekDate, index: number) => (
                    <div
                      key={index}
                      className="text-center text-sm font-medium text-gray-600 p-2">
                      {day.day} {day.date}
                    </div>
                  ))}

                  {/* Time Slots */}
                  {timeSlots.map((slot: TimeSlot) => (
                    <Fragment key={slot.id}>
                      <div className="flex items-center text-sm font-medium text-gray-700 p-2">
                        {slot.start}
                      </div>
                      {weekDates.map((day: WeekDate, dayIndex: number) => (
                        <button
                          key={`${day.fullDate}-${slot.id}`}
                          onClick={() =>
                            toggleSlot(day.fullDate, slot.id, slot)
                          }
                          className={`p-3 text-sm font-medium border-2 rounded-lg transition-all ${getSlotButtonClass(
                            day.fullDate,
                            slot.id
                          )}`}
                          disabled={
                            getSlotAvailability(day.fullDate, slot.id) !==
                              "available" &&
                            !isSlotSelected(day.fullDate, slot.id)
                          }>
                          {slot.start}
                        </button>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Booking Summary
              </h2>

              {selectedSlots.length > 0 ? (
                <div className="space-y-4">
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {selectedTurf}
                        </h3>
                        <p className="text-sm text-gray-600">
                          90 minutes per slot
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">Sports Complex</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selected Slots:</span>
                      <span className="font-medium">
                        {selectedSlots.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per Slot:</span>
                      <span className="font-medium">$50</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-green-600">
                      <span>Total Amount:</span>
                      <span>${totalAmount}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="font-semibold text-gray-800">
                      Selected Time Slots:
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedSlots.map(
                        (slot: SelectedSlot, index: number) => (
                          <div
                            key={index}
                            className="text-sm bg-gray-50 p-2 rounded">
                            <div className="font-medium">
                              {new Date(slot.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                            <div className="text-gray-600">
                              {slot.slot.start} - {slot.slot.end}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="tel"
                          placeholder="Mobile Number"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => (window.location.href = "/payment")}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 shadow-lg">
                    <CreditCard className="w-5 h-5" />
                    <span>Book Now - ${totalAmount}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Select time slots to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
